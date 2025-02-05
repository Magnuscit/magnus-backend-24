import axios from "axios";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { db } from "../../config";
import { User } from "../queries";
import { sendRegistrationEmail } from "../templates/mail";

const getUser = async (req: Request, res: Response): Promise<Response> => {
  const email = req.user?.email;
  const client = await db.connect();
  try {
    const userCheck = await client.query(User.getUser, [email]);
    if (userCheck.rows.length > 0) {
      return res.status(200).json({
        status: "👍",
        message: "user exists",
        data: userCheck.rows[0],
      });
    }
    return res.status(404).json({
      status: "👎",
      message: "user doesn't exists",
      data: null,
    });
  } catch (e) {
    console.error("Error when trying to check if a user exists", e);
    return res.status(500).json({
      status: "👎",
      data: null,
      message: "some error occured when checking for user",
    });
  } finally {
    client.release();
  }
};

const isUserFullyRegistered = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const email = req.user?.email;
  const client = await db.connect();
  try {
    const doesUserFullyRegistered = await client.query(
      User.doesUserFullyRegister,
      [email],
    );
    if (doesUserFullyRegistered.rows[0].has_null) {
      return res.status(200).json({
        status: "notok",
      });
    } else {
      return res.status(200).json({
        status: "ok",
      });
    }
  } catch (e) {
    console.error(
      "Error occured when checking whether the user is fully registered",
      e,
    );
    return res.status(500).json({
      status: "👎",
    });
  } finally {
    client.release();
  }
};

const updateUserData = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, phone_no, clg_name } = req.body;
  const email = req.user?.email;
  const client = await db.connect();
  try {
    await client.query(User.updateUser, [name, clg_name, phone_no, email]);
    await sendRegistrationEmail(name, email as string);
    return res.status(200).json({
      status: "👍",
    });
  } catch (e) {
    console.error("Error when trying to add a user", e);
    return res.status(500).json({
      status: "👎",
    });
  } finally {
    client.release();
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const client = await db.connect();
  try {
    const { token } = req.body;

    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const { email } = profile;

    const checkUserExistence = await client.query(User.doesUserExists, [email]);
    if (checkUserExistence.rows.length == 0) {
      await client.query(User.addUser, [email]);
    } else {
      console.log("User already exists");
    }
    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "72h",
    });

    return res.status(200).json({
      status: "👍",
      jwt: jwtToken,
      data: profile,
      message: "successfully logged in",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: "👎",
      jwt: null,
      message: "Error occured when signing in",
    });
  }
};

const UserControllers = {
  getUser,
  updateUserData,
  login,
  isUserFullyRegistered,
};
export default UserControllers;
