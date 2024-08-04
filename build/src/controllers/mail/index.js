"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = void 0;
const config_1 = require("../../../config");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const MailSponsor = async (req, res) => {
    const { body, subject, meta } = req.body;
    try {
        const emailPromises = meta.map(async (values) => {
            let modBody = body;
            values.forEach((value, idx) => {
                const placeholder = new RegExp(`\\$\\{${idx}\\}`, 'g');
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
            return config_1.ses.sendMail(data);
        });
        await Promise.all(emailPromises);
        return res.status(200).json({ status: "👍", message: "[Mail sponsor]: Mail sent successfully" });
    }
    catch (err) {
        return res.status(500).json({ status: "👎", message: "[Mail sponsor]: Internal Server Error", error: err.message });
    }
};
const Mail = {
    MailSponsor,
};
exports.Mail = Mail;
//# sourceMappingURL=index.js.map