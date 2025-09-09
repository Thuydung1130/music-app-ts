import { Router } from "express";
const router: Router = Router();

import *as controller from "../../controllers/client/user.controller"

router.get("/login", controller.login);
router.get("/register", controller.register);
router.post("/login", controller.loginPost);
router.post("/register", controller.registerPost);

export const userRoutes: Router = router;
