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
      throw new apiErrors("Fields can't be empty", 400);
    }

    // Create the comment
    let usersComment = await Comment.create({
      comment,
      blog_id,
      user_id: user.id,
    });

    if (!usersComment) {
      throw new apiErrors("Comment not created", 400);
    }

    // Populate the comment with user details (username and avatar)
    usersComment = await usersComment.populate("user_id", "username avatar");

    res
      .status(201)
      .json(new apiResponse("Comment created successfully", 201, usersComment));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json(new apiErrors(error.message, error.status || 500));
  }
});

const editComment = asyncWrapper(async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      throw new apiErrors("User not logged in", 401);
    }

    const { commentId, comment } = req.body;

    if (!commentId || !comment) {
      throw new apiErrors("Comment ID and comment are both required", 400);
    }

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: {
          comment: comment,
        },
      },
      { new: true }
    );

    if (!editedComment) {
      throw new apiErrors("Comment not found", 404);
    }

    res.status(200).json(new apiResponse("Comment Edited", 200, editedComment));
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json(new apiErrors(error.message, error.status || 500));
  }
});

const deleteComment = asyncWrapper(async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      throw new apiErrors("User must be logged in to delete a comment", 401);
    }

    const { _id } = req.params;

    if (!_id) {
      throw new apiErrors("Comment ID is required", 400);
    }

    const deletedComment = await Comment.findByIdAndDelete(_id);

    if (!deletedComment) {
      throw new apiErrors("Failed to delete the comment", 404);
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

const getAllComments = asyncWrapper(async (req, res) => {
  try {
    const { blog_id } = req.params;

    if (!blog_id) {
      throw new apiErrors("Blog ID is required", 400);
    }

    const comments = await Comment.find({ blog_id })
      .populate("user_id", "avatar username fullname") // Adjust fields according to your User model
      .exec();

    if (!comments) {
      throw new apiErrors("No comments found", 404);
    }

    res
      .status(200)
      .json(new apiResponse("Comments fetched successfully", 200, comments));
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json(apiErrors(error.message, error.status || 500));
  }
});

export { createComment, editComment, deleteComment, getAllComments };
