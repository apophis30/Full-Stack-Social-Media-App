import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 500,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = models.Comment || model("Comment", commentSchema);
