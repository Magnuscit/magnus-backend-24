import express from "express";
import cors from "cors";
import { PORT } from "../config/constants";
import { Home, Admin, Mail, Payment, User, Event } from "./routes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config";
import { CorsOptions } from "cors";
import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000", "https://www.magnuscit.live"];

const allowedOrgins = [
  "domain.com",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:6969",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:6969",
];

const corsOptions: CorsOptions = {
  // origin(requestOrigin, callback) {
  //   if (!requestOrigin || allowedOrgins.indexOf(requestOrigin) !== -1) {
  //     callback(null, requestOrigin);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: allowedOrgins,
  optionsSuccessStatus: 200,
};

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrgins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
};

// const corsOptions = {
//   origin: allowedOrigins,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(Home.BASE_ROUTE, Home.router);
app.use(Mail.BASE_ROUTE, Mail.router);
app.use(Admin.BASE_ROUTE, Admin.router);
app.use(Payment.BASE_ROUTE, Payment.router);
app.use(User.BASE_ROUTE, User.router);
app.use(Event.BASE_ROUTE, Event.router);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PORT RUNNING ON ${PORT} '_^`);
});
