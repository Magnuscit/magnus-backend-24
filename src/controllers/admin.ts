import { Request, Response } from "express";
import { db } from "../../config";
import { Admin } from "../queries";
import jwt from "jsonwebtoken";

const AdminLogin = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  const client = await db.connect();
  try {
    const result = await client.query(Admin.getAdminPassword, [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "👎", message: "[Admin Login]: Admin not found" });
    }
    const admin = result.rows[0];
    if (admin.password !== password) {
      return res
        .status(401)
        .json({ status: "👎", message: "[Admin Login]: Password incorrect" });
    }
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.cookie("admin-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      status: "👍",
      message: "[Admin Login]: Admin logged in",
      data: { token },
    });
  } finally {
    client.release();
  }
};

const AdminVerify = async (req: Request, res: Response) => {
  const token = req.cookies["admin-token"];
  if (!token) {
    return res
      .status(401)
      .json({ status: "👎", message: "[Admin Verify]: No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "👎", message: "[Admin Verify]: Invalid token" });
      }

      const client = await db.connect();
      try {
        const result = await client.query(Admin.getAdminPassword, [decoded.id]);
        if (result.rows.length === 0) {
          return res
            .status(404)
            .json({ status: "👎", message: "[Admin Verify]: Admin not found" });
        }
        return res.status(200).json({
          status: "👍",
          message: "[Admin Verify]: Admin verified",
          data: { decoded },
        });
      } finally {
        client.release();
      }
    },
  );
  return;
};

const AdminControllers = {
  AdminLogin,
  AdminVerify,
};

export default AdminControllers;
