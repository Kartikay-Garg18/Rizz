import { Router } from "express";
import { createUser, getCurrentUser, loginUser, googleLoginUser, forgotPassword, resetPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route('/register').post(createUser);

router.route('/login').post(loginUser);

router.route('/user').get(verifyJWT, getCurrentUser);

router.route('/google').post(googleLoginUser)

router.route('/forgot').post(forgotPassword)

router.route('/forgot').patch(resetPassword)

export default router;