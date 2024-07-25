import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { validateTokens } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register-user").post(upload.single("avatar"), registerUser);
router.route("/login-user").post(loginUser);

//Secured Routes
router.route("/logout-user").post(validateTokens, logoutUser);

export default router;
