import { Router } from "express";
import {
  createFollowDoc,
  toggleFollow,
} from "../controllers/follow.controller.js";
import { validateTokens } from "../middlewares/auth.middleware.js";
const router = Router();

//Secured Routes
router.route("/create-follow").post(validateTokens, createFollowDoc);
router.route("/toggle-follow").patch(validateTokens, toggleFollow);

export default router;
