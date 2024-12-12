import { Types } from "mongoose";

interface ChatParam {
  _id: Types.ObjectId;
  participants: UserDataParam[];
  messages: MessageParam[];
}
