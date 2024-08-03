import express from "express";
import cors from "cors";
import { PORT } from "../config/constants";
import { Home } from "./routes/index";

const app = express();

const allowedOrigins = [
	"http://localhost:3000",
	"https://www.magnuscit.live/",
];

const corsOptions = {
	origin: allowedOrigins,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(Home.BASE_ROUTE, Home.router);

app.listen(PORT, () => {
	console.log(`PORT RUNNING ON ${PORT} '_^`);
});
