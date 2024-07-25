import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: function () {
        return !this.likedPost;
      },
    },
    likedBlog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: function () {
        return !this.likedComment;
      },
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
