"use client";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="py-3 px-4 md:px-10 flex justify-between items-center bg-soft-black shadow-sm shadow-soft-black">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Image src="/assets/logo.png" width={40} height={40} alt="Logo" />
        <h2 className="text-2xl text-slate-200 font-bold">LoopSocial</h2>
      </div>

      <SignedOut>
        <ClerkLoading>
          <Loader2 className="animate-spin text-dark-blue-100 h-8 w-8" />
        </ClerkLoading>
        <ClerkLoaded>
          <Button variant="custom" asChild>
            <SignInButton />
          </Button>
        </ClerkLoaded>
      </SignedOut>

      <SignedIn>
        <ClerkLoading>
          <Loader2 className="animate-spin text-dark-blue-100 h-8 w-8" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </SignedIn>
    </nav>
  );
};
