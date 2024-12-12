"use server";

import { Chat } from "@/config/database/models/chat.model";
import { User } from "@/config/database/models/user.model";
import { connectToDatabase } from "@/config/database/mongoose";
import { handleError } from "@/lib/utils";
import { Message } from "@/config/database/models/message.model";

export const createChat = async (userId1: string, userId2: string) => {
  try {
    await connectToDatabase();

    const user1 = await User.findOne({ userId: userId1 });
    const user2 = await User.findOne({ userId: userId2 });

    const chat = await Chat.findOne({
      participants: { $all: [user1._id, user2._id] },
    });

    if (!chat) {
      await Chat.create({
        participants: [user1._id, user2._id],
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const pushMessageInChat = async (
  userId1: string,
  userId2: string,
  message: MessageParam
) => {
  try {
    await connectToDatabase();

    const user1 = await User.findOne({ userId: userId1 });
    const user2 = await User.findOne({ userId: userId2 });

    const chat = await Chat.findOneAndUpdate(
      {
        participants: { $all: [user1._id, user2._id] },
      },
      { $push: { messages: message } }
    );

    if (!chat) {
      await Chat.create({
        participants: [user1._id, user2._id],
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const getChatsByUserId = async (userId: string) => {
  try {
    await connectToDatabase();

    if (!userId) {
      return;
    }

    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("Unable to fetch user");
    }

    const chats = await Chat.find({ participants: user._id }).populate(
      "participants"
    );

    if (!chats) {
      throw new Error("No chat or unable to get chats");
    }

    return JSON.stringify(chats);
  } catch (error) {
    handleError(error);
  }
};

export const getMessagesByChatParticipants = async (
  user1Id: string,
  user2Id: string
) => {
  try {
    await connectToDatabase();

    console.log("USER ID1:--", user1Id);
    console.log("USER ID2:--", user2Id[0]);

    const user1 = await User.findOne({ userId: user1Id });
    const user2 = await User.findOne({ userId: user2Id });

    if (!user1 || !user2) {
      throw new Error("Unauthorized users");
    }

    const chat = await Chat.findOne({
      participants: { $all: [user1._id, user2._id] },
    }).populate({
      path: "messages",
      populate: {
        path: "sendBy sendTo",
      },
    });

    if (!chat) {
      throw new Error("Unable to find chat");
    }

    return JSON.stringify(chat.messages);
  } catch (error) {
    handleError(error);
  }
};
