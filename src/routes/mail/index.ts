import express from "express";
import { Mail } from "../../controllers";
import { asyncHandler } from "../../middlewares";

const router = express.Router();
const BASE_ROUTE = "/mail";

router.post("/sponsor", asyncHandler(Mail.MailSponsor));

const MODULE = {
	router,
	BASE_ROUTE,
};

export default MODULE;
