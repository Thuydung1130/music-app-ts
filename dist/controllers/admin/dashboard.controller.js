"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const index = async (req, res) => {
    const statstic = {
        Topics: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        Songs: {
            total: 0,
            active: 0,
            inactive: 0
        },
        Singers: {
            total: 0,
            active: 0,
            inactive: 0
        },
        Accounts: {
            total: 0,
            active: 0,
            inactive: 0
        },
        Users: {
            total: 0,
            active: 0,
            inactive: 0,
        }
    };
    statstic.Topics.total = await topic_model_1.default.countDocuments({
        deleted: false
    });
    statstic.Topics.active = await topic_model_1.default.countDocuments({
        deleted: false,
        status: "active"
    });
    statstic.Topics.inactive = await topic_model_1.default.countDocuments({
        deleted: false,
        status: "inactive"
    });
    statstic.Songs.total = await song_model_1.default.countDocuments({
        deleted: false
    });
    statstic.Songs.active = await song_model_1.default.countDocuments({
        deleted: false,
        status: "active"
    });
    statstic.Songs.inactive = await song_model_1.default.countDocuments({
        deleted: false,
        status: "inactive"
    });
    statstic.Singers.total = await singer_model_1.default.countDocuments({
        deleted: false
    });
    statstic.Singers.active = await singer_model_1.default.countDocuments({
        deleted: false,
        status: "active"
    });
    statstic.Singers.inactive = await singer_model_1.default.countDocuments({
        deleted: false,
        status: "inactive"
    });
    statstic.Accounts.total = await account_model_1.default.countDocuments({
        delete: false
    });
    statstic.Accounts.active = await account_model_1.default.countDocuments({
        delete: false,
        status: "active"
    });
    statstic.Accounts.inactive = await account_model_1.default.countDocuments({
        delete: false,
        status: "inactive"
    });
    console.log(statstic);
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Tổng quan",
        statstic: statstic
    });
};
exports.index = index;
