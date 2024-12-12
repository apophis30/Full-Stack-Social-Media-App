"use client";

import React from "react";

import { userBioChange } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface DisplayBioProps {
  currentUser: UserDataParam;
  user: {
    id: string;
  };
}

const DisplayBio = ({ currentUser, user }: DisplayBioProps) => {
  const [bio, setBio] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleBioUpdate = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      await userBioChange(currentUser.userId, bio);
      toast({
        title: "Success",
        description: "Bio updated successfully",
      });

      setBio("");
      currentUser.bio = bio;
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Unable to update bio",
        variant: "destructive",
      });
      currentUser.bio = "";
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-2">
      {currentUser?.bio && (
        <p className="text-muted-foreground">{currentUser?.bio}</p>
      )}
      {currentUser?.userId === user.id && (
        <form className="flex" onSubmit={handleBioUpdate}>
          <Input
            placeholder="Update bio"
            className="px-1 py-0 bg-slate-100 border-slate-100 w-full md:w-1/2 rounded-r-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={loading}
          />
          <Button className="rounded-l-none" size="icon" type="submit">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-dark-blue-100" />
            ) : (
              <Image
                src="/assets/write.svg"
                alt="Update Bio"
                height={18}
                width={18}
              />
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default DisplayBio;
