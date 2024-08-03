"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
    idleTimeoutMillis: 20000,
    max: 10
});
exports.default = pool;
//# sourceMappingURL=db.js.map