import Image from "next/image";
import queryString from "query-string";
import { useRouter } from "next/navigation";

interface UserAvatarProps {
  username: string;
  firstName: string;
  lastName?: string;
  profilePic: string;
  userId: string;
}

const UserAvatar = ({
  username,
  firstName,
  lastName,
  profilePic,
  userId,
}: UserAvatarProps) => {
  const router = useRouter();

  const handleClick = (userId: string) => {
    const url = queryString.stringifyUrl({
      url: "/user/",
      query: {
        id: userId,
      },
    });

    router.push(url);
  };

  return (
    <div
      className="bg-soft-black rounded-md w-full md:w-1/2 text-white p-4 flex items-center space-x-4 hover:bg-soft-black/80 cursor-pointer"
      onClick={() => handleClick(userId)}
    >
      <Image
        src={profilePic}
        alt="Profile Pic"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1">
        <p>{username}</p>
        <p className="text-muted-foreground">{`${firstName} ${
          lastName !== null ? lastName : ""
        }`}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
