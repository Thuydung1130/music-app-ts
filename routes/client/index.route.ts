import { Express } from "express";
import *as  authMiddleware from "../../middlewares/client/auth.middleware"
import { infoUser } from "../../middlewares/client/user.middleware";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { sreachRoutes } from "./sreach.route";
import { homeRoutes } from "./home.route";
import { singerRoutes } from "./singer.route";
import { userRoutes } from "./user.route";
const clientRoutes = (app: Express): void => {
  app.use(infoUser);
  app.use("/singers",singerRoutes);
  app.use("/user",userRoutes);
  app.use("/topics",authMiddleware.requireAuth, topicRoutes);
  app.use(`/songs`,songRoutes)
  app.use("/favorite-songs",authMiddleware.requireAuth, favoriteSongRoutes);
  app.use("/sreach",sreachRoutes);
  app.use("/",homeRoutes)

};

export default clientRoutes;
