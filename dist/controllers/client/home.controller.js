"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const index = async (req, res) => {
    console.log("ok");
    let sort = {};
    sort["createdAt"] = "desc";
    const songs = await song_model_1.default.find({
        status: "active",
        deleted: false
    }).sort(sort).limit(9).select("title avatar id singerId slug ").lean();
    const singer = await singer_model_1.default.find({
        status: "active",
        deleted: false
    }).select("fullName avatar").limit(6);
    for (const song of songs) {
        const infoSinger = await singer_model_1.default.findOne({
            _id: song.singerId
        }).select("fullName slug");
        song["singer"] = infoSinger;
        const favoriteSong = await favorite_song_model_1.default.findOne({
            songId: song._id
        });
        song["isFavoriteSong"] = favoriteSong ? true : false;
    }
    console.log(songs);
    const topic = await topic_model_1.default.find({
        deleted: false
    }).select("title");
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        songs: songs,
        singer: singer,
        topic: topic
    });
};
exports.index = index;
