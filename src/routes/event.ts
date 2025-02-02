import express from "express";
import { Event } from "../controllers";
import { asyncHandler, authenticateJWT } from "../middlewares";

const router = express.Router();
const BASE_ROUTE = "/events";

router.get("/fetch", authenticateJWT, asyncHandler(Event.fetchEvents));

const MODULE = {
  router,
  BASE_ROUTE,
};

export default MODULE;
