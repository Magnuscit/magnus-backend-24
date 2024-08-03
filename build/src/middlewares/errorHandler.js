"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
function errorHandler(err, _, res) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            status: 400,
            body: {
                message: "Error From Zod",
                error: err,
            },
        });
    }
    console.log(err);
    return res.status(500).json({
        statusCode: 500,
        body: {
            message: "Something Wrong with the server",
            error: err,
        },
    });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map