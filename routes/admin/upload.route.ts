import { Router } from "express";
const router: Router = Router();
import multer from "multer"
import *as controller from "../../controllers/admin/upload.controller"
const upload=multer();

import *as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

router.post(
    "/", 
    upload.single("file"),
    uploadCloud.uploadSingle,
    controller.index
);

export const uploadRoutes: Router = router;