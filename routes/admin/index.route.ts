import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";
import { singerRoutes } from "./singer.route";
import { accountRoutes } from "./account.route";
import { roleRoutes } from "./role.route";
import { authRoutes } from "./auth.route";
import { myAccountRoutes } from "./my-account.route";
import *as  authMiddleware from "../../middlewares/admin/auth.middleware"
const adminRoutes=(app:Express):void=>{
    const PATH_ADMIN=`/${systemConfig.prefixAdmin}`
    app.use(`${PATH_ADMIN}/dashboard`,authMiddleware.requireAuth,dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`,authMiddleware.requireAuth,topicRoutes);
    app.use(`${PATH_ADMIN}/songs`,authMiddleware.requireAuth,songRoutes);
    app.use(`${PATH_ADMIN}/uploads`,authMiddleware.requireAuth,uploadRoutes);
    app.use(`${PATH_ADMIN}/singers`,authMiddleware.requireAuth,singerRoutes);
    app.use(`${PATH_ADMIN}/accounts`,authMiddleware.requireAuth,accountRoutes);
    app.use(`${PATH_ADMIN}/roles`,authMiddleware.requireAuth,roleRoutes);
    app.use(`${PATH_ADMIN}/my-account`,authMiddleware.requireAuth,myAccountRoutes);
    app.use(`${PATH_ADMIN}/auth`,authRoutes);
}



export default adminRoutes
