"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = async (req, res) => {
    const favoriteSongs = await favorite_song_model_1.default.find({
        deleted: false
    });
    for (const item of favoriteSongs) {
        const infoSong = await song_model_1.default.findOne({
            _id: item.songId
        });
        const infoSinger = await singer_model_1.default.findOne({
            _id: infoSong.singerId
        });
        item["infoSong"] = infoSong,
            item["infoSinger"] = infoSinger;
    }
    res.render("client/pages/favorite-songs/index", {
        pageTitle: "Bài hát yêu thích",
        favoriteSongs: favoriteSongs
    });
};
exports.index = index;
