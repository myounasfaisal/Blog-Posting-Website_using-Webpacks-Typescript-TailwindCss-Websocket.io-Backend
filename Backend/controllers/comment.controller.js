import { Comment } from "../models/comment.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const createComment = asyncWrapper(async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      throw new apiErrors("User must be logged in to make comments", 401);
    }

    const { comment, blog_id } = req.body;

    if (!comment || !blog_id) {
      throw new apiErrors("Fields Can't be empty");
    }

    const usersComment = await Comment.create({
      comment,
      blog_id,
      user_id: user.id,
    });

    if (!usersComment) {
      throw new apiErrors("Comment not created", 400);
    }

    res
      .status(201)
      .json(new apiResponse("Comment Created SuccessFully", 201, usersComment));
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json(apiErrors(error.message, error.status || 500));
  }
});

const editComment = asyncWrapper(async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      throw new apiErrors("User Not Logged In");
    }

    const { commentId, comment } = req.body;

    if (!commentId || comment) {
      throw new apiErrors("Comment Id and comment Both are required", 400);
    }

    const editedComment = await Comment.findByIdAndUpdate(
      (commentId,
      {
        $set: {
          comment: comment,
        },
      })
    );

    if (!editedComment) {
      throw new apiErrors("Comment Not Found", 404);
    }

    res.status(200).json(new apiResponse("Comment Edited", 200, editedComment));
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json(apiErrors(error.message, error.status || 500));
  }
});

//Start
const deleteComment = asyncWrapper(async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      throw new apiErrors("User Should Be Logged In");
    }

    const { _id } = req.params;

    if (!_id) {
      throw new apiErrors("Comment Id is required", 400);
    }

    const deletedComment = await Comment.findByIdAndDelete(_id);

    if (!deletedComment) {
      throw new apiErrors("Failed To Delete The Comment");
    }

    res
      .status(200)
      .json(
        new apiResponse("Comment Deleted Successfully", 200, deletedComment)
      );
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json(apiErrors(error.message, error.status || 500));
  }
});

export { createComment, editComment, deleteComment };
