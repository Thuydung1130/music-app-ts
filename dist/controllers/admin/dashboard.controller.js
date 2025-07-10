"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const index = async (req, res) => {
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Tổng quan"
    });
};
exports.index = index;
