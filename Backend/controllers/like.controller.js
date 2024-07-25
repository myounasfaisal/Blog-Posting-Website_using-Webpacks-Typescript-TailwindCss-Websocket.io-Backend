import { Like } from "../models/like.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const toggleLike = asyncWrapper(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new apiErrors("You must be logged in to give a like", 405);
  }
  const { likeId, contentId, contentType } = req.body;
  //first If
  if (!likeId && contentId && contentType) {
    const like = await Like.create({
      likedBy: user.id,
      ...(contentType = "comment"
        ? { likedComment: contentId }
        : { likedBlog: contentId }),
    });

    if (!like) {
      throw new apiErrors("Like Operation Failed", 400);
    }

    return res
      .status(200)
      .json(
        new apiResponse("Like Operation Performed SuccessFully", 200, like)
      );
  }
  //If-closed

  if (!likeId && !contentId && !contentType) {
    throw new apiErrors("Reference Required", 400);
  }

  if (likeId) {
    const deletedlike = await Like.findOneAndDelete({
      _id: likeId,
    });

    if (deletedlike) {
      return apiResponse(res, 200, "Like Deleted Successfully", deletedlike);
    }
  }
});

export { toggleLike };
