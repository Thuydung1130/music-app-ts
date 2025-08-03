"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
const result = async (req, res) => {
    const type = req.params.type;
    const keyword = `${req.query.keyword}`;
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        const stringSlug = (0, convertToSlug_1.convertToSlug)(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = await song_model_1.default.find({
            $and: [
                { deleted: false },
                {
                    $or: [
                        { title: keywordRegex },
                        { slug: stringSlugRegex }
                    ]
                }
            ]
        });
        for (const item of songs) {
            const infoSinger = await singer_model_1.default.findOne({
                _id: item.singerId
            });
            newSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoSinger: {
                    fullName: infoSinger.fullName
                }
            });
        }
    }
    switch (type) {
        case "result":
            res.render("client/pages/sreach/result", {
                pageTitle: `Kết quả: ${keyword}`,
                keyword: keyword,
                songs: newSongs
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Thành công!",
                songs: newSongs
            });
            break;
        default:
            break;
    }
};
exports.result = result;
