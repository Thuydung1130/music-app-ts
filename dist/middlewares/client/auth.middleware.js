"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const requireAuth = async (req, res, next) => {
    try {
        console.log("hi");
        if (!req.cookies.tokenUser) {
            console.log("yse");
            res.redirect("/user/login");
            return;
        }
        const user = await user_model_1.default.findOne({ tokenUser: req.cookies.tokenUser }).select("-password");
        if (!user) {
            res.redirect("/user/login");
            return;
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.redirect("/user/login");
    }
};
exports.requireAuth = requireAuth;
