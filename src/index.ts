import express from "express";
import cors from "cors";
import { PORT } from "../config/constants";
import { Home, Admin, Mail, Payment } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = ["http://localhost:3000", "https://www.magnuscit.live"];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

app.use(Home.BASE_ROUTE, Home.router);
app.use(Mail.BASE_ROUTE, Mail.router);
app.use(Admin.BASE_ROUTE, Admin.router);
app.use(Payment.BASE_ROUTE, Payment.router);

app.listen(PORT, () => {
  console.log(`PORT RUNNING ON ${PORT} '_^`);
});
