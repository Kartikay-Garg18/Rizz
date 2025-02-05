import { Router } from "express";
import { getUsersForSidebar , getMessages , sendMessage} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route('/user').get(verifyJWT, getUsersForSidebar);
router.route('/:id').get(verifyJWT, getMessages);
router.route('/send/:id').post(verifyJWT, sendMessage);

export default router;