"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const config_1 = require("../../config/config");
const md5_1 = __importDefault(require("md5"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const index = async (req, res) => {
    const admins = await account_model_1.default.find({
        delete: false
    }).select("-password -token").lean();
    for (const admin of admins) {
        const role = await role_model_1.default.find({
            _id: admin.role_id,
            delete: false
        });
        admin["role"] = role[0];
    }
    res.render("admin/pages/accounts/index", {
        pageTitle: "Accounts",
        admin: admins,
    });
};
exports.index = index;
const create = async (req, res) => {
    const roles = await role_model_1.default.find({
        delete: false
    });
    res.render("admin/pages/accounts/create", {
        pageTitle: "Create Admin",
        roles: roles
    });
};
exports.create = create;
const createPost = async (req, res) => {
    const emailExits = await account_model_1.default.findOne({
        email: req.body.email,
        delete: false
    });
    if (emailExits) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
    }
    else {
        const adminData = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            role_id: req.body.role_id,
            status: req.body.status,
            avatar: req.body.avatar
        };
        const admin = new account_model_1.default(adminData);
        admin.save();
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
    }
};
exports.createPost = createPost;
const edit = async (req, res) => {
    const id = req.params.id;
    const account = await account_model_1.default.findOne({
        _id: id
    }).select("-password -token");
    const roles = await role_model_1.default.find({
        delete: false
    }).select("title id");
    res.render("admin/pages/accounts/edit", {
        pageTitle: "Edit Admin",
        account: account,
        roles: roles
    });
};
exports.edit = edit;
const editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExits = await account_model_1.default.findOne({
        email: req.body.email,
        delete: false,
    });
    console.log(req.body);
    if (emailExits) {
        if (req.body.password) {
            req.body.password = (0, md5_1.default)(req.body.password);
        }
        else {
            delete req.body.password;
        }
        await account_model_1.default.updateOne({ _id: id }, req.body);
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts/edit/${id}`);
    }
    else {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts/edit/${id}`);
    }
};
exports.editPatch = editPatch;
