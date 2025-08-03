"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favorite_song_route_1 = require("./favorite-song.route");
const sreach_route_1 = require("./sreach.route");
const home_route_1 = require("./home.route");
const singer_route_1 = require("./singer.route");
const clientRoutes = (app) => {
    app.use("/singers", singer_route_1.singerRoutes);
    app.use("/topics", topic_route_1.topicRoutes);
    app.use(`/songs`, song_route_1.songRoutes);
    app.use("/favorite-songs", favorite_song_route_1.favoriteSongRoutes);
    app.use("/sreach", sreach_route_1.sreachRoutes);
    app.use("/", home_route_1.homeRoutes);
};
exports.default = clientRoutes;
