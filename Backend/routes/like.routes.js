import { Router } from "express";
import { validateTokens } from "../middlewares/auth.middleware.js";
import { toggleLike } from "../controllers/like.controller.js";
const router = Router();

//Secure Routes
router.route("/toggle-like").post(validateTokens, toggleLike);

export default router;
