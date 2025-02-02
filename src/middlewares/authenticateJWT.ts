import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//@ts-ignore
const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.cookies);
  const token = req.cookies?.jwt;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  //@ts-ignore
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ message: "Forbidden: Invalid token" });
    }

    //@ts-ignore
    req.user = { email: (decoded as { email: string }).email };

    next();
  });
};

export default authenticateJWT;
