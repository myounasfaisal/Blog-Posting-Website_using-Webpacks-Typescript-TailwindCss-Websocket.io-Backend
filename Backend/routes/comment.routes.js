import { Router } from "express";
import { validateTokens } from "../middlewares/auth.middleware.js";
import {
  createComment,
  editComment,
  getAllComments,
} from "../controllers/comment.controller.js";
const router = Router();
router.route("/get-comments/:blog_id").get(getAllComments);

// Secured Routes
router.route("/create-comment").post(validateTokens, createComment);
router.route("/edit-comment").patch(validateTokens, editComment);

export default router;
