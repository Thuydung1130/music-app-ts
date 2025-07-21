
import { Router } from "express";
import multer from "multer"
const router: Router = Router();

import *as controller from "../../controllers/admin/song.controller"
const upload=multer();

import *as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
//import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";



router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"audio",maxCount:1}
    ]),
    uploadCloud.uploadFields,
    controller.createPost);
router.get("/edit/:id",controller.edit)
router.patch(
    "/edit/:id",
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"audio",maxCount:1}
    ]),
    uploadCloud.uploadFields,
    controller.editPatch
);
router.delete("/delete/:id",controller.deleteSong)
export const songRoutes: Router = router;