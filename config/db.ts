import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST || "localhost",
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: 6543,
	idleTimeoutMillis: 20000,
	max: 10
});

export default pool;
