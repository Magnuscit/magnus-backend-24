"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const HomeMessage = async (_, res) => {
    return res.status(200).json({
        status: "👍",
        message: "Magnus'24 backend (^-^)",
    });
};
const Home = {
    HomeMessage
};
exports.Home = Home;
//# sourceMappingURL=index.js.map