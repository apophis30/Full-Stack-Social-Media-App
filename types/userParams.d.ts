interface UserDataParam {
  userId: string;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  profilePic?: string;
  bio?: string;
  posts?: Array<{ type: string; ref: string }>;
  createdAt?: Date;
}
