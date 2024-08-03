import { Request, Response } from "express"

const HomeMessage = async (_: Request, res: Response) => {
	return res.status(200).json({
		status: "👍",
		message: "Magnus'24 backend (^-^)",
	})
};

const Home = {
	HomeMessage
}

export { Home };
