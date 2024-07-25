import { Follow } from "../models/follow.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const toggleFollow = asyncWrapper(async (req, res) => {
  const { user } = req;
  if (!user) {
    throw new apiErrors("You must be logged in to follow a user", 400);
  }
  const { followDocId } = req.body;

  if (!followDocId) {
    throw new apiErrors("Doc's ID required", 400);
  }

  const follow = await Follow.findById(foll);
});
