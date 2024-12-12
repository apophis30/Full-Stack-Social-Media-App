interface MessageParam {
  _id?: Types.ObjectId;
  message: string;
  sendBy: {
    username: string;
    userId: string;
  };
  sendTo: {
    username: string;
    userId: string;
  };
  createdAt?: Date;
}
