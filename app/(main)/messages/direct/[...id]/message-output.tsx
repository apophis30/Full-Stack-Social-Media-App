"use client";

import { getMessagesByChatParticipants } from "@/actions/chat-actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useEffect } from "react";

interface MessageOutputProps {
  sender: string;
  receiver: string;
  messages: MessageParam[];
  setMessages: Dispatch<SetStateAction<MessageParam[]>>;
}

const MessageOutput = ({
  sender,
  receiver,
  messages,
  setMessages,
}: MessageOutputProps) => {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded) {
      const fetchMessages = async () => {
        try {
          const data = await getMessagesByChatParticipants(user?.id!, receiver);

          setMessages((prevData) => [...prevData, ...JSON.parse(data!)]);
          // console.log(JSON.parse(data!));
        } catch (error) {
          console.log(error);
        }
      };

      fetchMessages();
    }
  }, [isLoaded]);

  useEffect(() => {
    const lastDiv = document.getElementById("lastMessage");
    lastDiv?.scrollIntoView();
  }, [messages]);

  const parseDate = (date: Date) => {
    const newData = new Date(date);
    return `${newData.getHours()}:${newData.getMinutes()}:${newData.getSeconds()} ${newData.getDate()}-${
      newData.getMonth() + 1
    }-${newData.getFullYear()}`;
  };

  return (
    <ScrollArea className="h-[67vh] bg-slate-100">
      {messages.length > 0 &&
        messages.map((item) => (
          <div
            className="p-2 flex flex-col items-center space-y-2"
            key={item._id.toString()}
          >
            <div
              className={`w-full px-4 py-2 rounded-md flex flex-col justify-center bg-slate-200/40 ${
                sender === item.sendBy.userId ? "items-end" : "items-start"
              }`}
            >
              <p
                className={`text-muted-foreground w-full md:w-1/2 ${
                  sender === item.sendBy.userId ? "text-end" : "text-start"
                }`}
              >
                <span className="font-bold underline">
                  {item.sendBy.username}
                </span>
                <span className="text-sm ml-2 font-normal">
                  {parseDate(item.createdAt!)}
                </span>
              </p>
              <p>{item.message}</p>
            </div>
          </div>
        ))}
      <div id="lastMessage" />
    </ScrollArea>
  );
};

export default MessageOutput;
