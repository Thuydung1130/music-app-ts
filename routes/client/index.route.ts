import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { sreachRoutes } from "./sreach.route";
import { homeRoutes } from "./home.route";
import { singerRoutes } from "./singer.route";
const clientRoutes = (app: Express): void => {
  app.use("/singers",singerRoutes)
  app.use("/topics", topicRoutes);
  app.use(`/songs`,songRoutes)
  app.use("/favorite-songs",favoriteSongRoutes);
  app.use("/sreach",sreachRoutes);
  app.use("/",homeRoutes)

};

export default clientRoutes;
