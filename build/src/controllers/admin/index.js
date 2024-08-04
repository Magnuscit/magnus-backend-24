"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config");
const queries_1 = require("../../queries");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AdminLogin = async (req, res) => {
    const { id, password } = req.body;
    const client = await config_1.db.connect();
    try {
        const result = await client.query(queries_1.Admin.getAdminPassword, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ status: "👎", message: "[Admin Login]: Admin not found" });
        }
        const admin = result.rows[0];
        if (admin.password !== password) {
            return res.status(401).json({ status: "👎", message: "[Admin Login]: Password incorrect" });
        }
        const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("admin-token", token, { httpOnly: true, secure: true, sameSite: "none" });
        return res.status(200).json({ status: "👍", message: "[Admin Login]: Admin logged in", data: { token } });
    }
    finally {
        client.release();
    }
};
const AdminVerify = async (req, res) => {
    const token = req.cookies['admin-token'];
    if (!token) {
        return res.status(401).json({ status: "👎", message: "[Admin Verify]: No token provided" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "👎", message: "[Admin Verify]: Invalid token" });
        }
        const client = await config_1.db.connect();
        try {
            const result = await client.query(queries_1.Admin.getAdminPassword, [decoded.id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ status: "👎", message: "[Admin Verify]: Admin not found" });
            }
            return res.status(200).json({ status: "👍", message: "[Admin Verify]: Admin verified", data: { decoded } });
        }
        finally {
            client.release();
        }
    });
    return;
};
const AdminControllers = {
    AdminLogin,
    AdminVerify,
};
exports.default = AdminControllers;
//# sourceMappingURL=index.js.map