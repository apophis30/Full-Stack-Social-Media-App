"use server";

import { User } from "@/config/database/models/user.model";
import { connectToDatabase } from "@/config/database/mongoose";
import { handleError } from "@/lib/utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    if (!newUser) {
      throw new Error("Unable to create new user");
    }

    return newUser;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (id: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ userId: id }, user, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("Unable to update the user");
    }

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDatabase();

    await User.findOneAndDelete({ userId: id });
  } catch (error) {
    handleError(error);
  }
};

export const getUserByUserId = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("Unable to find the user");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const userBioChange = async (userId: string, bio: string) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ userId }, { bio });

    if (!updatedUser) {
      throw new Error("Unable to update the bio");
    }
  } catch (error) {
    handleError(error);
  }
};
