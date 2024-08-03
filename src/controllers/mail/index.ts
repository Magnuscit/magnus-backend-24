import { Request, Response } from "express"
import { ses } from "../../../config"
import * as dotenv from "dotenv"
dotenv.config();

type MailBody = {
	meta: Array<Array<string>>,
	description: string
	subject: string
}


const MailSponsor = async (req: Request, res: Response) => {
	const { description, subject, meta }: MailBody = req.body;

	try {
		// PREPROCESS DATA
		// 1. parse description // ${0}...${n}
		// 2. Replace ${0}...${n} with meta[i][0]...meta[i][n]

		ses.sendMail({
			from: process.env.VERIFIED_EMAIL,
			to: process.env.VERIFIED_EMAIL,
			bcc: [],
			subject,
			html:
				`<html>
				<head>
					<title>${subject}</title>
				</head>
				<body>
				// proccessed description
				</body>
			</html>`
		})
		return res.status(200).json({ status: "👍", message: "[Mail sponsor]: Mail sent succesfully" });
	} catch (err) {
		return res.status(500).json({ status: "👎", message: "[Mail sponsor]: Internal Server Error", error: err });
	}
};

const Mail = {
	MailSponsor,
}

export { Mail };
