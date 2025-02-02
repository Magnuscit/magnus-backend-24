import express from "express";
import { User } from "../controllers";
import { asyncHandler, authenticateJWT } from "../middlewares";

const router = express.Router();
const BASE_ROUTE = "/user";

router.get("/get", authenticateJWT, asyncHandler(User.getUser));
router.get(
  "/userFullyRegistered",
  authenticateJWT,
  asyncHandler(User.isUserFullyRegistered),
);
router.post("/updateUser", authenticateJWT, asyncHandler(User.updateUserData));

router.post("/login", asyncHandler(User.login));

const MODULE = {
  router,
  BASE_ROUTE,
};

export default MODULE;
