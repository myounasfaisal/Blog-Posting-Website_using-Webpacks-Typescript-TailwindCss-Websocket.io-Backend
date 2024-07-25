import { Router } from "express";
import { validateTokens } from "../middlewares/auth.middleware.js";
import { editBlog, postBlog } from "../controllers/post.controllers.js";

const router = Router();

//Secured Routes
router.route("/post-blog").post(validateTokens, postBlog);
router.route("/edit-blog").patch(validateTokens, editBlog);
export default router;
