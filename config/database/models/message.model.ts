import { Schema, models, model } from "mongoose";

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  sendBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sendTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = models.Message || model("Message", MessageSchema);
