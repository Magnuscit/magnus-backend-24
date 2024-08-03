"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("../config/constants");
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(index_1.Home.BASE_ROUTE, index_1.Home.router);
app.listen(constants_1.PORT, () => {
    console.log(`PORT RUNNING ON ${constants_1.PORT} '_^`);
});
//# sourceMappingURL=index.js.map