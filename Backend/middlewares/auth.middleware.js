import jwt from "jsonwebtoken";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { User } from "../models/user.model.js";

export const validateTokens = asyncWrapper(async (req, res, next) => {
  const { accessToken } = req.body || req.header("Auhtorizaton") || req.cookie;

  if (!accessToken) throw new apiErrors("Cookies Not Found", 404);

  const decodedToken = await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!decodedToken) throw new apiErrors("Cookies Expired", 402);

  const user = await User.findById(decodedToken._id);

  if (!user) throw new apiErrors("Invalid Cookie", 403);

  req.user = user;
  next();
});
