"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HomeMessage = async (_, res) => {
    return res.status(200).json({
        status: "👍",
        message: "Magnus'24 backend (^-^)",
    });
};
const HomeControllers = {
    HomeMessage
};
exports.default = HomeControllers;
//# sourceMappingURL=index.js.map