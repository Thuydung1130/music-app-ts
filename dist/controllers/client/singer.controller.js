"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singer = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer = async (req, res) => {
    const slugSinger = req.params.slug;
    const singer = await singer_model_1.default.findOne({
        slug: slugSinger,
        deleted: false,
        status: "active"
    }).select("id avatar fullName slug");
    const songs = await song_model_1.default.find({
        singerId: singer.id,
        deleted: false,
    }).select("avatar title slug");
    console.log(songs);
    res.render("client/pages/singer/detail", {
        pageTitle: singer.fullName,
        isSingerPage: true,
        singer: singer,
        songs: songs
    });
};
exports.singer = singer;
