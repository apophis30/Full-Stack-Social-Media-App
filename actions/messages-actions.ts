"use server";

import { Message } from "@/config/database/models/message.model";
import { User } from "@/config/database/models/user.model";
import { connectToDatabase } from "@/config/database/mongoose";
import { handleError } from "@/lib/utils";
import { startSession } from "mongoose";
import { createChat, pushMessageInChat } from "./chat-actions";

export const createMessage = async (
  content: string,
  sendBy: string,
  sendTo: string
) => {
  await connectToDatabase();

  const session = await startSession();
  session.startTransaction();

  try {
    await createChat(sendBy, sendTo);

    const sender = await User.findOne({ userId: sendBy });
    const receiver = await User.findOne({ userId: sendTo });

    if (!sender || !receiver) {
      throw new Error("Unable to get chat participants");
    }

    const newMessage = await Message.create({
      message: content,
      sendBy: sender._id,
      sendTo: receiver._id,
    });

    if (!newMessage) {
      throw new Error("Unable to create message");
    }

    await pushMessageInChat(sendBy, sendTo, newMessage);

    await session.commitTransaction();
    return JSON.stringify(newMessage);
  } catch (error) {
    await session.abortTransaction();
    handleError(error);
  } finally {
    session.endSession();
  }
};

export const getMessages = async (chatId: string) => {
  try {
  } catch (error) {
    handleError(error);
  }
};
