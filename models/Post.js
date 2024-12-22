import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlenght: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlenght: 1000,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    votesCounter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
