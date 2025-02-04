import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//@ts-ignore
const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  //@ts-ignore
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    console.log(err);
    if (err || !decoded) {
      return res.status(401).json({ message: "Forbidden: Invalid token" });
    }
    //@ts-ignore
    req.user = { email: (decoded as { email: string }).email };

    next();
  });
};
export default authenticateJWT;
