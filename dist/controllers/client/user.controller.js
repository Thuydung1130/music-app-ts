"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPost = exports.loginPost = exports.register = exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const login = async (req, res) => {
    res.render("client/pages/users/login", {
        pageTitle: "Login",
    });
};
exports.login = login;
const register = async (req, res) => {
    res.render("client/pages/users/login", {
        pageTitle: "Login",
    });
};
exports.register = register;
const loginPost = async (req, res) => {
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        const user = await user_model_1.default.findOne({
            email: email,
            delete: false
        });
        if (!user) {
            console.log("ko co user");
            res.redirect(req.get("Referer") || "/");
            return;
        }
        if ((0, md5_1.default)(password) !== user.password) {
            console.log("sai mat khau");
            res.redirect(req.get("Referer") || "/");
            return;
        }
        if (user.status === "inactive") {
            console.log("khoA");
            res.redirect(req.get("Referer") || "/");
            return;
        }
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/");
    }
    catch (error) {
        console.error(error);
        res.redirect(req.get("Referer") || "/");
    }
};
exports.loginPost = loginPost;
const registerPost = async (req, res) => {
    try {
        const existEmail = await user_model_1.default.findOne({ email: req.body.email });
        if (existEmail) {
            res.redirect("/");
            return;
        }
        req.body.password = (0, md5_1.default)(req.body.password);
        const user = new user_model_1.default(req.body);
        await user.save();
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/");
    }
    catch (error) {
        console.error(error);
        res.redirect("back");
    }
};
exports.registerPost = registerPost;
