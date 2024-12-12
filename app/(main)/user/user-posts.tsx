"use client";

import { getPostsByUserId } from "@/actions/post-actions";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserPosts = ({ id }: { id: string }) => {
  const [images, setImages] = useState<PostParams[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostsByUserId(id);

        if (JSON.parse(data!).length > 0) {
          setImages(JSON.parse(data!));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [id, images]);

  return (
    <>
      {images.length === 0 && (
        <div className="text-muted-foreground py-20 text-lg flex-1 flex justify-center items-center gap-2">
          <span>No Images</span>
          <Image
            src="/assets/no-image.svg"
            width={20}
            height={20}
            alt="No Image"
          />
        </div>
      )}
      {images.length > 0 && (
        <article className="grid grid-cols-2 lg:grid-cols-3 gap-4 grid-rows-1">
          {images.map((image) => (
            <div
              className="bg-soft-black/10 rounded-md shadow-sm px-2 flex justify-center items-center object-cover mx-auto w-full"
              key={image.author._id}
            >
              <Image
                key={image._id.toString()}
                src={image.imageUrl}
                width={200}
                height={200}
                alt="Image"
                className="w-auto h-auto"
              />
            </div>
          ))}
        </article>
      )}
    </>
  );
};

export default UserPosts;
