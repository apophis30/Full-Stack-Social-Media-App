"use client";

import { Types } from "mongoose";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { likePost } from "@/actions/post-actions";
import { useToast } from "@/components/ui/use-toast";

interface ImageCardProps {
  postId: Types.ObjectId;
  author: UserDataParam;
  imageUrl: string;
  caption: string;
  hashtags?: string;
  place?: string;
  createdAt: string;
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
}

export const ImageCard = ({
  author,
  imageUrl,
  caption,
  hashtags,
  place,
  createdAt,
  comments,
  likes,
  postId,
}: ImageCardProps) => {
  const { user } = useUser();
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      const answer = await likePost(user?.id!, postId);

      if (answer === "already liked") {
        toast({
          title: "Wait",
          description: "You already like the post",
        });
      }

      if (answer === "updated") {
        toast({
          title: "Success",
          description: "Liked the post successfully",
        });
        likes.length += 1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-300 via-emerald-400 to-indigo-500 p-0.5 w-[75%] mx-auto md:w-full h-full rounded-md shadow-md">
      <div className="bg-slate-200/90 w-full rounded-md h-full flex flex-col justify-center items-center p-2 space-y-1">
        <Image
          src={imageUrl}
          width={300}
          height={300}
          alt="Image"
          className="shadow-sm rounded-md"
        />
        <div className="w-full p-2 "></div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="justify-self-end">
              Open Image
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <Image
              src={imageUrl}
              width={400}
              height={400}
              alt="Image"
              onClick={() => window.open(imageUrl, "_blank")}
            />

            <DialogHeader className="w-full">
              <DialogTitle className="text-start border-b-2 border-slate-200 pb-2 flex items-center">
                <span className="text-slate-400">{author.username}</span>
                <span className="ml-2">{`${author.firstName} ${
                  author.lastName ? author.lastName : ""
                }`}</span>

                {likes.length > 0 ? (
                  <span className="flex items-center ml-auto gap-1">
                    <Image
                      src="/assets/heart-fill.svg"
                      width={20}
                      height={20}
                      alt="Likes"
                      className="hover:bg-slate-100 cursor-pointer rounded-full"
                      onClick={handleLike}
                    />
                    {likes.length}
                  </span>
                ) : (
                  <span className="flex items-center ml-auto gap-1">
                    <Image
                      src="/assets/heart.svg"
                      width={20}
                      height={20}
                      alt="Likes"
                      className="hover:bg-slate-100 cursor-pointer rounded-full"
                      onClick={handleLike}
                    />
                    {likes.length}
                  </span>
                )}
              </DialogTitle>

              <DialogDescription className="text-start">
                <span>{caption}</span>
                <span className="ml-1 text-dark-blue-200">{hashtags}</span>
                {place && (
                  <div className="text-sm text-muted-foreground flex items-center justify-start mt-1 gap-1">
                    <MapPin className="h-4 w-4 text-dark-blue-200" />
                    {place}
                  </div>
                )}
                <div className="text-sm text-muted-foreground flex items-center justify-start mt-1 gap-1">
                  <Calendar className="h-4 w-4 text-dark-blue-100" />
                  {createdAt.slice(0, 10)}
                </div>
              </DialogDescription>
            </DialogHeader>

            {/* <DialogFooter className="border-t-2 border-slate-200 pt-2 w-full">
              {comments.length === 0 ? <p>No comments</p> : <p>Comments</p>}
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
