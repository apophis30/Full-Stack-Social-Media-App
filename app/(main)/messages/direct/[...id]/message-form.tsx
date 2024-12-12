"use client";

import { createMessage } from "@/actions/messages-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const MessageForm = ({
  userId,
  setMessages,
}: {
  userId: string;
  setMessages: Dispatch<SetStateAction<MessageParam[]>>;
}) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!content) {
      return;
    }

    setLoading(true);

    try {
      const newMessage = await createMessage(content, user?.id!, userId);

      if (!newMessage) {
        toast({
          title: "Error",
          description: "Unable to create message",
          variant: "destructive",
        });
      }

      setMessages((prevState) => [...prevState, JSON.parse(newMessage!)]);
    } catch (error) {
      console.log(error);
    } finally {
      setContent("");
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full flex justify-center items-center mt-2"
      onSubmit={handleSubmit}
    >
      <Input
        className="bg-slate-100 flex-1 max-w-screen-lg rounded-r-none"
        placeholder="Enter a message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <Button disabled={loading} className="rounded-l-none">
        {loading ? (
          <Loader2 className="h-5 w-5 text-dark-blue-100 animate-spin" />
        ) : (
          <span className="text-dark-blue-100">Send</span>
        )}
      </Button>
    </form>
  );
};

export default MessageForm;
