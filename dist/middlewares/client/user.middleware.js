"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoUser = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const infoUser = async (req, res, next) => {
    try {
        if (req.cookies.tokenUser) {
            const user = await user_model_1.default.findOne({
                tokenUser: req.cookies.tokenUser,
                delete: false,
                status: "active"
            }).select("-password");
            if (user) {
                res.locals.user = user;
            }
            console.log(user);
        }
        next();
    }
    catch (error) {
        console.error("infoUser middleware error:", error);
        next(error);
    }
};
exports.infoUser = infoUser;
