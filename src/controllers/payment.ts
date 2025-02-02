import { Request, Response } from "express";
import crypto from "crypto";
import { db, razorpay } from "../../config";
import { Event, User, Payment } from "../queries";
import Razorpay from "razorpay";
import { sendBoardingPass } from "../templates/mail";
// import format from "pg-format";

const CURRENCY = "INR";

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { amount, receipt, notes } = req.body;
  const email = req.user?.email;
  const client = await db.connect();
  try {
    const doesUserExist = await client.query(User.doesUserExists, [email]);
    if (doesUserExist.rows.length == 0) {
      return res.status(500).json({
        status: "👎",
        message: "Failed to create order, no user with the given email exists",
      });
    }
  } catch (e) {
  } finally {
    client.release();
  }
  try {
    const options = {
      amount: amount, // should be in paise
      receipt,
      currency: CURRENCY,
      notes,
    };
    const order = await razorpay.orders.create(options);
    return res.status(200).json({ status: "👍", order });
  } catch (err) {
    return res.status(500).json({
      status: "👎",
      message: "Failed to create order",
      error: err.message,
    });
  }
};

const verifyPayment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { order_id, payment_id, signature } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (generatedSignature === signature) {
      return res
        .status(200)
        .json({ status: "👍", message: "Payment verified successfully" });
    }
    return res
      .status(400)
      .json({ status: "👎", message: "Invalid payment signature" });
  } catch (err) {
    return res.status(500).json({
      status: "👎",
      message: "Oh no, failed to verify payment",
      error: err.message,
    });
  }
};

const webhook = async (req: Request, res: Response): Promise<Response> => {
  let isAuthorizedHit = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    req.headers["x-razorpay-signature"] as string,
    process.env.RAZORPAY_WEBHOOK_SECRET || "",
  );
  if (!isAuthorizedHit) {
    return res.status(401).json({ error: "fuck off, malicious actor" });
  }
  const { event, payload, created_at } = req.body;
  if (event == "payment.captured") {
    const {
      id: payment_id,
      email: userEmail,
      notes: event,
    } = payload.payment.entity;
    const client = await db.connect();
    try {
      // we need to handle idempotency
      const paymentInsertion = await client.query(Payment.insertPayment, [
        payment_id,
        new Date(created_at * 1000),
      ]);
      console.log(paymentInsertion);

      const { eventId } = event;

      const insertUserEvent = await client.query(Payment.insertUserEvent, [
        eventId,
        userEmail,
        payment_id,
      ]);
      console.log(insertUserEvent);

      // if (team_members.length > 0) {
      //   const team_member_data = team_members.map((member: any) => [
      //     member.email,
      //     member.clgName,
      //     member.phoneNo,
      //     eventId,
      //     userEmail,
      //   ]);
      //   await client.query(format(Event.addTeamMembers, team_member_data));
      // }

      const userClg = await client.query(User.getUserClg, [userEmail]);
      const eventName = await client.query(Event.fetchEventName, [eventId]);

      // send boarding pass email
      await sendBoardingPass(
        userEmail,
        userClg.rows[0].clg_name as string,
        eventName.rows[0].name,
      );

      // might as well send mail to team members too
    } catch (err) {
      console.error("Errrrr at webhook:", err);
      return res.status(500).json({
        status: "👎",
        message: "Failed to process payment",
        error: err.message,
      });
    } finally {
      client.release();
    }
    // console.log(payment_id, userEmail, events);
  }
  return res.status(200).json({ status: "👍", message: "Webhook received" });
};

const PaymentControllers = {
  createOrder,
  verifyPayment,
  webhook,
};

export default PaymentControllers;
