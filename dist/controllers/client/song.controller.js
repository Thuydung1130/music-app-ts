"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audio = exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = async (req, res) => {
    const topic = await topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    });
    const songs = await song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like");
    for (const song of songs) {
        const infoSinger = await singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["infoSinger"] = infoSinger;
    }
    console.log(songs);
    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
};
exports.list = list;
const detail = async (req, res) => {
    const slugSong = req.params.slugSong;
    const song = await song_model_1.default.findOne({
        slug: slugSong,
        status: "active",
        deleted: false
    }).select("-audio");
    const singer = await singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName");
    const topic = await topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false
    }).select("title");
    const favoriteSong = await favorite_song_model_1.default.findOne({
        songId: song.id
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail", {
        pageTitle: "chi tiet bai hat",
        song: song,
        singer: singer,
        topic: topic
    });
};
exports.detail = detail;
const like = async (req, res) => {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = await song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    const newLike = typeLike === "yes" ? song.like + 1 : song.like - 1;
    await song_model_1.default.updateOne({
        _id: idSong
    }, {
        like: newLike
    });
    res.json({
        code: 200,
        newLike: newLike
    });
};
exports.like = like;
const favorite = async (req, res) => {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "yes":
            const existFavoriteSong = await favorite_song_model_1.default.findOne({
                songId: idSong
            });
            if (!existFavoriteSong) {
                const record = new favorite_song_model_1.default({
                    songId: idSong
                });
                await record.save();
            }
            break;
        case "no":
            await favorite_song_model_1.default.deleteOne({
                songId: idSong
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
    });
};
exports.favorite = favorite;
const listen = async (req, res) => {
    const idSong = req.params.idSong;
    const song = await song_model_1.default.findOne({
        _id: idSong
    });
    const listen = song.listen + 1;
    await song_model_1.default.updateOne({ _id: idSong }, { listen: listen });
    const songNew = await song_model_1.default.findOne({
        _id: idSong
    });
    res.json({
        code: 200,
        message: "Thành công!",
        listen: songNew.listen
    });
};
exports.listen = listen;
const audio = async (req, res) => {
    const idSong = req.params.idSong;
    const song = await song_model_1.default.findOne({
        _id: idSong
    });
    res.json({
        audio: song.audio,
        id: song.id
    });
};
exports.audio = audio;
