"use client";

import { getChatsByUserId } from "@/actions/chat-actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatParam } from "@/types/chatParams";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState<ChatParam[]>([]);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChatsByUserId(user?.id!);

        setChats(JSON.parse(data!));
      } catch (error) {
        console.log(error);
      }
    };

    fetchChats();
  }, [user]);

  if (!user) {
    return (
      <div className="h-[75vh] bg-slate-300 my-4 rounded-md flex justify-center items-center">
        <Loader2 className="animate-spin h-8 w-8 text-soft-black" />
      </div>
    );
  }

  const handleChatClick = (members: UserDataParam[]) => {
    const target = members.filter((member) => member.userId !== user.id);
    console.log(target);

    const url = `/messages/direct/${target[0].userId}`;

    router.push(url);
  };

  return (
    <ScrollArea className="w-full bg-slate-300 h-[75vh] my-4 rounded-md shadow-sm ">
      <div className="flex flex-col space-y-4 p-2 h-full">
        {chats?.length > 0 &&
          chats?.map((chat) =>
            chat.participants
              .filter((member) => member.userId !== user.id)
              .map((item) => (
                <div
                  key={chat._id.toString()}
                  className="bg-slate-200 rounded-md w-full shadow-sm p-4 flex items-center cursor-pointer hover:bg-slate-200/80"
                  onClick={() => handleChatClick(chat.participants)}
                >
                  <Image
                    src={item.profilePic!}
                    width={36}
                    height={36}
                    alt="Profile Pic"
                    className="rounded-full mr-4 shadow-md"
                  />
                  <span>{item.username}</span>
                  <span className="text-muted-foreground ml-2">{`${
                    item.firstName
                  } ${item.lastName ? item.lastName : ""}`}</span>
                </div>
              ))
          )}
      </div>
    </ScrollArea>
  );
};

export default ChatPage;
