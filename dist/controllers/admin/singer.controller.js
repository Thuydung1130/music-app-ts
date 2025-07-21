"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.create = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const index = async (req, res) => {
    const singer = await singer_model_1.default.find({
        deleted: false,
    });
    console.log(singer);
    res.render("admin/pages/singer/index", {
        pageTitle: "Trang bài hát",
        singers: singer
    });
};
exports.index = index;
const create = async (req, res) => {
    res.render("admin/pages/singer/create", {
        pageTitle: "Create singer"
    });
};
exports.create = create;
const createPost = async (req, res) => {
    const dataSinger = {
        fullName: req.body.fullName,
        avatar: req.body.avatar,
        status: req.body.status
    };
    const singer = new singer_model_1.default(dataSinger);
    singer.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
};
exports.createPost = createPost;
