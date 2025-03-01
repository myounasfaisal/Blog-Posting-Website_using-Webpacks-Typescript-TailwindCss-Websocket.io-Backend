import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  updatePassword, // Include updatePassword
  deleteAccount, // Include deleteAccount
} from "../controllers/user.controllers.js";
import { validateTokens } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register-user").post(upload.single("avatar"), registerUser);
router.route("/login-user").post(loginUser);
router.route("/get-userdetails/:id").get(getUserDetails);

// Secured Routes
router.route("/logout-user").post(validateTokens, logoutUser);
router
  .route("/updateProfile")
  .patch(validateTokens, upload.single("avatar"), updateUserProfile);
router.route("/update-password").post(validateTokens, updatePassword); // Update Password Route
router.route("/delete-account").delete(validateTokens, deleteAccount); // Delete Account Route

export default router;
