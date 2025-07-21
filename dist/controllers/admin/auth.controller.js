"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginPost = exports.login = void 0;
const config_1 = require("../../config/config");
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const login = async (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${config_1.systemConfig.prefixAdmin}/dashboard`);
    }
    else {
        res.render("admin/pages/auth/login", {
            pageTitle: "Login"
        });
    }
};
exports.login = login;
const loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await account_model_1.default.findOne({
        email: email,
        delete: false
    });
    if (!user) {
        res.redirect(`${config_1.systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if ((0, md5_1.default)(password) != user.password) {
        res.redirect(`${config_1.systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if (user.status == "inactive") {
        res.redirect(`${config_1.systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    res.cookie("token", user.token);
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/dashboard`);
};
exports.loginPost = loginPost;
const logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/auth/login`);
};
exports.logout = logout;
