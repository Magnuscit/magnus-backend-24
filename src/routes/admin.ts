import express from "express";
import { Admin } from "../controllers";
import { asyncHandler } from "../middlewares";

const router = express.Router();
const BASE_ROUTE = "/admin";

router.post("/login", asyncHandler(Admin.AdminLogin));
router.post("/verify", asyncHandler(Admin.AdminVerify));

const MODULE = {
  router,
  BASE_ROUTE,
};

export default MODULE;
