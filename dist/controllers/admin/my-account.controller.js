"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.index = void 0;
const index = async (req, res) => {
    res.render("admin/pages/my-account/index"), {
        pageTitle: "Thông tin cá nhân"
    };
};
exports.index = index;
const edit = async (req, res) => {
    res.render("admin/pages/my-account/edit"), {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    };
};
exports.edit = edit;
