"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const config_1 = require("../../config/config");
const requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/auth/login`);
    }
    else {
        const user = await account_model_1.default.findOne({ token: req.cookies.token }).select("-password");
        if (!user) {
            res.redirect(`/${config_1.systemConfig.prefixAdmin}/auth/login`);
        }
        else {
            const role = await role_model_1.default.findOne({
                _id: user.role_id
            }).select("title permissions");
            res.locals.user = user;
            res.locals.role = role;
            console.log(role);
            next();
        }
    }
};
exports.requireAuth = requireAuth;
