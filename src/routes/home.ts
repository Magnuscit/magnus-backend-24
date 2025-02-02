import express from "express";
import { Home } from "../controllers";

const router = express.Router();
const BASE_ROUTE = "/";

router.get("/", Home.HomeMessage);

const MODULE = {
  router,
  BASE_ROUTE,
};

export default MODULE;
