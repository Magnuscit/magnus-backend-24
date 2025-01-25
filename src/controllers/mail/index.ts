import { Request, Response } from "express";
import { ses } from "../../../config";

type MailBody = {
  meta: Array<Array<string>>;
  body: string;
  subject: string;
};

const MailSponsor = async (req: Request, res: Response): Promise<Response> => {
  const { body, subject, meta }: MailBody = req.body;

  try {
    const emailPromises = meta.map(async (values) => {
      let modBody = body;
      values.forEach((value, idx) => {
        const placeholder = new RegExp(`\\$\\{${idx}\\}`, "g");
        modBody = modBody.replace(placeholder, value);
      });

      const data = {
        from: process.env.VERIFIED_EMAIL,
        to: values[0],
        subject,
        html: `
					<html>
					<head>
						<title>${subject}</title>
					</head>
					<body>
						${modBody}
					</body>
					</html>
				`,
      };
      return ses.sendMail(data);
    });

    await Promise.all(emailPromises);
    return res.status(200).json({
      status: "👍",
      message: "[Mail sponsor]: Mail sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "👎",
      message: "[Mail sponsor]: Internal Server Error",
      error: err.message,
    });
  }
};

const MailControllers = {
  MailSponsor,
};

export default MailControllers;
