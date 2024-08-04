"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAdminPassword = "SELECT password FROM admin WHERE id = $1";
const AdminQueries = {
    getAdminPassword,
};
exports.default = AdminQueries;
//# sourceMappingURL=index.js.map