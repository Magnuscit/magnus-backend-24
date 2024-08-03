"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../../src/controllers");
const router = express_1.default.Router();
const BASE_ROUTE = "/";
router.get("/", controllers_1.Home.HomeMessage);
const MODULE = {
    router,
    BASE_ROUTE,
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map