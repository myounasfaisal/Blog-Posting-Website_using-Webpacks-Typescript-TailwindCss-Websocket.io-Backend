import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blog: Object,

    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
