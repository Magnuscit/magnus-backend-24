"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.ses = void 0;
var ses_1 = require("./ses");
Object.defineProperty(exports, "ses", { enumerable: true, get: function () { return __importDefault(ses_1).default; } });
var db_1 = require("./db");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return __importDefault(db_1).default; } });
//# sourceMappingURL=index.js.map