import { Request, Response } from "express";
import crypto from "crypto";
import { db, razorpay } from "../../../config";
import { Payment } from "../../queries";
import pgFormat from "pg-format";

const CURRENCY = "INR";

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { amount, receipt, notes } = req.body;
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
    } else {
      return res
        .status(400)
        .json({ status: "👎", message: "Invalid payment signature" });
    }
  } catch (err) {
    return res.status(500).json({
      status: "👎",
      message: "Oh no, failed to verify payment",
      error: err.message,
    });
  }
};

const webhook = async (req: Request, res: Response): Promise<Response> => {
  const { event, payload, created_at } = req.body;
  if (event == "payment.captured") {
    const {
      id: payment_id,
      email: user_email,
      notes: events,
    } = payload.payment.entity;
    const client = await db.connect();
    try {
      const PAID = true;
      const paymentInsertion = await client.query(Payment.insertPayment, [
        payment_id,
        new Date(created_at * 1000),
      ]);
      console.log(paymentInsertion);

      const userEventsData = events.map((event: string) => [
        event.trim(),
        user_email,
        payment_id,
        PAID,
      ]);
      const query = pgFormat(Payment.insertUserEvents, userEventsData);
      const userEventInsertion = await client.query(query);
      console.log(userEventInsertion);
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
    console.log(payment_id, user_email, events);

    // we might want to send the email to the user here instead of keeping an endpoint
  }
  return res.status(200).json({ status: "👍", message: "Webhook received" });
};

const PaymentControllers = {
  createOrder,
  verifyPayment,
  webhook,
};

export default PaymentControllers;
