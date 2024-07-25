import { Router } from "express";
import { validateTokens } from "../middlewares/auth.middleware.js";
import {
  createComment,
  editComment,
} from "../controllers/comment.controller.js";
const router = Router();

router.route("/comment").post(validateTokens, createComment);
router.route("/edit-comment").patch(validateTokens, editComment);

export default router;
