"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
const BASE_ROUTE = "/admin";
router.post("/login", (0, middlewares_1.asyncHandler)(controllers_1.Admin.AdminLogin));
router.post("/verify", (0, middlewares_1.asyncHandler)(controllers_1.Admin.AdminVerify));
const MODULE = {
    router,
    BASE_ROUTE,
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map