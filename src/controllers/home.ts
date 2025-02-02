import { Request, Response } from "express";

const HomeMessage = async (_: Request, res: Response) => {
  return res.status(200).json({
    status: "👍",
    message: "Magnus'25 backend (^-^)",
  });
};

const HomeControllers = {
  HomeMessage,
};

export default HomeControllers;
