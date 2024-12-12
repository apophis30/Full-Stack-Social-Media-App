"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import ImageForm from "./image-form";

export const MediaUploader = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const handleUploadSuccess = (result: any) => {
    toast({
      title: "Success",
      description: "Image uploaded successfully",
      color: "green-400",
    });
    console.log(result?.info);
    setImageUrl(result?.info?.secure_url);
  };
  const handleUploadError = (result: any) => {
    console.log(result);
  };

  return (
    <>
      <div className="flex items-center justify-start py-4">
        <CldUploadWidget
          uploadPreset="as_social_media"
          options={{ multiple: false, resourceType: "image" }}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
        >
          {({ open }) => (
            <Button onClick={() => open()} className="text-dark-blue-100">
              <Image
                src="/assets/upload.svg"
                alt="Upload Image"
                width={24}
                height={20}
                className="mr-1"
              />
              Upload Photo
            </Button>
          )}
        </CldUploadWidget>
      </div>
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-x-4 items-center">
        {imageUrl && (
          <>
            <CldImage
              src={imageUrl}
              alt="image"
              width={300}
              height={300}
              className="border-2 border-slate-300 rounded-md shadow-md"
            />
            <ImageForm imageUrl={imageUrl} />
          </>
        )}
      </div>
    </>
  );
};
