import { Like } from "../models/like.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const createLikeDoc = asyncWrapper(async (req, res) => {
  const { user } = req;

  if (!user) {
    throw new apiErrors("User wasn't logged in", 402);
  }

  const { likedBlog } = req.body;

  if (!likedBlog) {
    throw new apiErrors("Blog ID is required", 404);
  }

  const likeDoc = await Like.findOne({
    likedBlog,
    likedBy: user.id,
  });

  if (likeDoc) {
    const totalLikes = await Like.countDocuments({ likedBlog, status: true });
    res
      .status(202)
      .json(
        new apiResponse("Like Document Exists, Proceed Further", 202, {
          likeDoc,
          totalLikes,
        })
      );
  } else {
    const like = await Like.create({
      likedBlog,
      likedBy: user.id,
      status: true,
    });

    if (!like) {
      throw new apiErrors("Failed to create like document", 500);
    }

    const totalLikes = await Like.countDocuments({ likedBlog, status: true });

    res
      .status(200)
      .json(
        new apiResponse("Like Document Created", 200, { like, totalLikes })
      );
  }
});

const toggleLike = asyncWrapper(async (req, res) => {
  const { user } = req;

  if (!user) {
    throw new apiErrors("You must be logged in to like/unlike a blog", 400);
  }

  const { likeDocId } = req.body;

  if (!likeDocId) {
    throw new apiErrors("Document ID is required", 400);
  }

  const likeDoc = await Like.findById(likeDocId);

  if (!likeDoc) {
    throw new apiErrors("Like document not found", 404);
  }

  // Check if the likeDoc belongs to the logged-in user
  if (likeDoc.likedBy.toString() !== user.id.toString()) {
    throw new apiErrors("You are not authorized to modify this document", 403);
  }

  likeDoc.status = !likeDoc.status;
  await likeDoc.save();

  res
    .status(200)
    .json(
      new apiResponse(
        likeDoc.status ? "Liked Successfully" : "Unliked Successfully",
        200,
        { status: likeDoc.status }
      )
    );
});

const getUserLikesStatus = asyncWrapper(async (req, res) => {
  const { user } = req;

  if (!user) {
    throw new apiErrors("User wasn't logged in", 402);
  }

  const userLikes = await Like.find({
    likedBy: user.id,
    status: true,
  }).populate("likedBlog");

  if (!userLikes.length) {
    res.status(200).json(new apiResponse("No liked posts found", 200, []));
  } else {
    res
      .status(200)
      .json(new apiResponse("Liked posts retrieved", 200, userLikes));
  }
});

export { createLikeDoc, toggleLike, getUserLikesStatus };
