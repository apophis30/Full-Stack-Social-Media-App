"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavMenu = () => {
  const { user } = useUser();
  const [client, setClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return <NavMenuSkeleton />;
  }

  return (
    <header className="p-4 flex items-center justify-between shadow-md">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/home/search">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Image
                  src="/assets/search-black.svg"
                  height={20}
                  width={20}
                  alt="Search"
                  className="mr-1"
                />
                <span className="hidden md:block">Search</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/messages">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Image
                  src="/assets/messages.svg"
                  height={20}
                  width={20}
                  alt="Search"
                  className="mr-1"
                />
                <span className="hidden md:block">Messages</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {user && (
            <NavigationMenuItem>
              <Link href={`/user?id=${user?.id}`}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Image
                    src="/assets/user.svg"
                    height={20}
                    width={20}
                    alt="Search"
                    className="mr-1"
                  />
                  <span className="hidden md:block">Profile</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {pathname !== "/home/upload" && (
        <Link href="/home/upload">
          <Button className="text-dark-blue-100">
            <Image
              src="/assets/upload.svg"
              height={25}
              width={25}
              alt="Search"
              className="mr-1"
            />
            <span className="hidden md:block">Upload Photo</span>
          </Button>
        </Link>
      )}
    </header>
  );
};

export default NavMenu;

const NavMenuSkeleton = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex gap-1 items-center">
        <Skeleton className="h-10 w-20 bg-soft-black/20" />
        <Skeleton className="h-10 w-20 bg-soft-black/20" />
        <Skeleton className="h-10 w-20 bg-soft-black/20" />
      </div>
      <Skeleton className="h-10 w-10 md:w-24 bg-soft-black/20" />
    </div>
  );
};
