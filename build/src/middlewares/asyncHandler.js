"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    };
}
exports.default = asyncMiddleware;
//# sourceMappingURL=asyncHandler.js.map