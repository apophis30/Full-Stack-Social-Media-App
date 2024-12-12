"use server";

import { Post } from "@/config/database/models/post.model";
import { User } from "@/config/database/models/user.model";
import { connectToDatabase } from "@/config/database/mongoose";
import { handleError } from "@/lib/utils";
import { Types } from "mongoose";

export const createPost = async (image: CreatePostParams) => {
  try {
    await connectToDatabase();

    const { userId, caption, imageUrl, place, hashtags } = image;

    const user = await User.findOne({ userId: userId });

    const newImage = await Post.create({
      author: user._id,
      caption,
      imageUrl,
      place,
      hashtags,
    });

    if (!newImage) {
      throw new Error("Unable to create Post");
    }
  } catch (error) {
    handleError(error);
  }
};

export const getPost = async () => {
  try {
    await connectToDatabase();

    const images = await Post.find({})
      .populate("author")
      .sort([["createdAt", -1]]);

    if (!images) {
      throw new Error("Unable to fetch posts");
    }

    return JSON.stringify(images);
  } catch (error) {
    handleError(error);
  }
};

export const getPostsByUserId = async (id: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ userId: id });

    const images = await Post.find({ author: user._id });

    if (!images) {
      throw new Error("Unable to fetch posts for the given user");
    }

    return JSON.stringify(images);
  } catch (error) {
    handleError(error);
  }
};

export const likePost = async (userId: string, postId: Types.ObjectId) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("Unauthorized");
    }

    const post = await Post.findOne({ _id: postId });

    if (post.likes.includes(user._id)) {
      return "already liked";
    }

    const newPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { likes: user._id } },
      { new: true }
    );

    if (!newPost) {
      throw new Error("Unable to like");
    }

    return "updated";
  } catch (error) {
    handleError(error);
  }
};
