import { Router } from "express";
const router:Router=Router();

import *as controller from "../../controllers/client/sreach.controller";

router.get("/:type",controller.result);


export const sreachRoutes:Router=router;