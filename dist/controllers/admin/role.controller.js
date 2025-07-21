"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsPatch = exports.permissions = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const config_1 = require("../../config/config");
const index = async (req, res) => {
    const roles = await role_model_1.default.find({
        delete: false
    }).select("title description");
    res.render("admin/pages/roles/index", {
        pageTitle: "Trang nhóm quyền",
        records: roles
    });
};
exports.index = index;
const create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Create Roles",
    });
};
exports.create = create;
const createPost = async (req, res) => {
    const roleData = {
        title: req.body.title,
        description: req.body.description
    };
    if (roleData) {
        const role = await new role_model_1.default(roleData);
        role.save();
    }
    else {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles`);
    }
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles`);
};
exports.createPost = createPost;
const edit = async (req, res) => {
    const id = req.params.id;
    const role = await role_model_1.default.findOne({
        _id: id
    }).select("title description");
    console.log(role);
    res.render("admin/pages/roles/edit", {
        pageTitle: "Edit Roles",
        data: role
    });
};
exports.edit = edit;
const editPatch = async (req, res) => {
    const id = req.params.id;
    const roleData = {
        title: req.body.title,
        description: req.body.description
    };
    if (roleData) {
        await role_model_1.default.updateOne({
            _id: id
        }, roleData);
    }
    else {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles/edit/${id}`);
    }
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles/edit/${id}`);
};
exports.editPatch = editPatch;
const permissions = async (req, res) => {
    let find = {
        delete: false
    };
    const records = await role_model_1.default.find(find);
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records
    });
};
exports.permissions = permissions;
const permissionsPatch = async (req, res) => {
    console.log(req.body);
    const permissions = JSON.parse(req.body.permissions);
    console.log(permissions);
    for (const item of permissions) {
        const id = item.id;
        const permissions = item.permission;
        await role_model_1.default.updateOne({ _id: id }, { permissions: permissions });
    }
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/roles/permissions`);
};
exports.permissionsPatch = permissionsPatch;
