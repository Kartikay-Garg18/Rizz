import { Router } from "express";
import { createUser, getCurrentUser, loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route('/register').post(createUser);

router.route('/login').post(loginUser);

router.route('/user').get(verifyJWT, getCurrentUser);

export default router;