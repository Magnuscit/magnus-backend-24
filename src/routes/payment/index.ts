import express from "express";
import { Payment } from "../../controllers";
import { asyncHandler } from "../../middlewares";

const router = express.Router();
const BASE_ROUTE = "/payment";

router.post("/create-order", asyncHandler(Payment.createOrder));
router.post("/verify-payment", asyncHandler(Payment.verifyPayment));
router.post("/webhook", asyncHandler(Payment.webhook));

const MODULE = {
  router,
  BASE_ROUTE,
};

export default MODULE;
