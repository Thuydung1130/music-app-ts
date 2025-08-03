import { Router } from "express";
const router: Router = Router();

import *as controller from "../../controllers/client/singer.controller"

router.get("/:slug", controller.singer);

export const singerRoutes: Router = router;
