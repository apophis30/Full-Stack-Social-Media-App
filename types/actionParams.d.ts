type CreateUserParams = {
  userId: string;
  username: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  profilePic?: string;
};

type UpdateUserParams = {
  userId: string;
  username: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  profilePic?: string;
};
