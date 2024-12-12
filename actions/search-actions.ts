"use server";

import { User } from "@/config/database/models/user.model";
import { connectToDatabase } from "@/config/database/mongoose";
import { handleError } from "@/lib/utils";

export const searchUser = async (username: string) => {
  try {
    await connectToDatabase();

    const regex = { $regex: username, $options: "i" };

    const users = await User.find({
      $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
    });

    if (!users) {
      throw new Error("Unable to retrieve users");
    }

    return users;
  } catch (error) {
    handleError(error);
  }
};
