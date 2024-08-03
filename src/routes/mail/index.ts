import express from "express";
import { asyncHandler } from "src/middlewares";

const router = express.Router();
const BASE_ROUTE = "/mail";

router.get("/sponsor", asyncHandler());

const MODULE = {
	router,
	BASE_ROUTE,
};

export default MODULE;
