import { Schema, models, model } from "mongoose";

const ChatSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

export const Chat = models.Chat || model("Chat", ChatSchema);
