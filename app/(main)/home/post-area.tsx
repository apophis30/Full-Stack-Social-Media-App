"use client";

import { getPost } from "@/actions/post-actions";
import { useEffect, useState } from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageCard } from "./image-card";

const PostArea = () => {
  const [posts, setPosts] = useState<PostParams[]>([]);
  const [noPosts, setNoPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPost();

      if (data?.length === 0) {
        setNoPosts(true);
      }

      setPosts(JSON.parse(data!));
    };

    fetchPosts();

    console.log(posts);
  }, []);

  if (posts.length === 0 && !noPosts) {
    return <PostAreaSkeleton />;
  }

  if (noPosts) {
    return <div>No posts to show</div>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.length > 0 &&
        posts.map((post) => (
          <ImageCard
            key={post._id!.toString()}
            postId={post._id!}
            author={post.author}
            imageUrl={post.imageUrl}
            caption={post.caption}
            hashtags={post.hashtags}
            place={post.place}
            createdAt={post.createdAt.toString()}
            comments={post.comments}
            likes={post.likes}
          />
        ))}
    </section>
  );
};

export default PostArea;

const PostAreaSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Skeleton className="h-60 w-full bg-soft-black/20 shadow-sm rounded-md" />
      <Skeleton className="h-60 w-full bg-soft-black/20 shadow-sm rounded-md" />
      <Skeleton className="h-60 w-full bg-soft-black/20 shadow-sm rounded-md" />
    </section>
  );
};
