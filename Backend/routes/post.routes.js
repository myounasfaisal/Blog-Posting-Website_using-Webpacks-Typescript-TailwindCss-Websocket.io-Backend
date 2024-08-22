import { Router } from "express";
import { validateTokens } from "../middlewares/auth.middleware.js";
import {
  editBlog,
  getAllBlogs,
  getSingleBlog,
  postBlog,
} from "../controllers/post.controllers.js";

const router = Router();
router.route("/get-blog/:_id").get(getSingleBlog);
router.route("/get-blogs").get(getAllBlogs);

//Secured Routes
router.route("/post-blog").post(validateTokens, postBlog);
router.route("/edit-blog").patch(validateTokens, editBlog);
export default router;
