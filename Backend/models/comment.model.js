import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
