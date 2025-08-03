import { Router } from "express";
const router: Router = Router();
import multer from "multer"


import *as controller from "../../controllers/admin/singer.controller"
const upload=multer();

import *as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

router.get("/", controller.index);
router.get("/create", controller.create);
router.post('/create',
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.createPost
);

export const singerRoutes: Router = router;