import { Router } from "express";
import { validateTokens } from "../middlewares/auth.middleware.js";
import {
  createLikeDoc,
  toggleLike,
  getUserLikesStatus,
} from "../controllers/like.controller.js";

const router = Router();

// Secure Routes
router.route("/like").post(validateTokens, createLikeDoc);
router.route("/toggle-like").post(validateTokens, toggleLike);
router.route("/getUserLikesStatus").get(validateTokens, getUserLikesStatus);

export default router;
