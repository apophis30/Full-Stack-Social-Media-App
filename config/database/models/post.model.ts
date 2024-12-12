import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  place: {
    type: String,
  },
  hashtags: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Post = models.Post || model("Post", PostSchema);
