import mongoose from "mongoose";
const followSchema = new mongoose.Schema(
  {
    follower_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    following_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Follow = mongoose.model("Follow", followSchema);
