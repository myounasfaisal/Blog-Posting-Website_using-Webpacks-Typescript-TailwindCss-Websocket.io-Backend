import { Follow } from "../models/follow.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const createFollowDoc = asyncWrapper(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new apiErrors("User wasn't logged in", 402);
  }

  const { following_id } = req.body;

  if (!following_id) {
    throw new apiErrors("Id's are required", 404);
  }

  const followDoc = await Follow.findOne({
    follower_id: user.id,
    following_id,
  });

  if (followDoc) {
    res
      .status(202)
      .json(new apiResponse("Document Exists Proceed Further", 202, followDoc));
  } else {
    const follow = await Follow.create({
      follower_id: user.id,
      following_id,
      status: true,
    });

    if (!follow) {
      throw new apiErrors("Failed to create follow document", 500);
    }

    res
      .status(200)
      .json(new apiResponse("Follow Document Created", 200, follow));
  }
});

const toggleFollow = asyncWrapper(async (req, res) => {
  const { user } = req;
  if (!user) {
    throw new apiErrors("You must be logged in to follow a user", 400);
  }

  const { followDocId } = req.body;

  if (!followDocId) {
    throw new apiErrors("Document ID is required", 400);
  }

  const followDoc = await Follow.findById(followDocId);

  if (!followDoc) {
    throw new apiErrors("Follow document not found", 404);
  }

  // Check if the followDoc belongs to the logged-in user
  if (followDoc.follower_id.toString() !== user.id.toString()) {
    throw new apiErrors("You are not authorized to modify this document", 403);
  }

  followDoc.status = !followDoc.status;
  await followDoc.save();

  res
    .status(200)
    .json(
      new apiResponse(
        followDoc.status ? "Followed Successfully" : "Unfollowed Successfully",
        200,
        { status: followDoc.status }
      )
    );
});
export { toggleFollow, createFollowDoc };
