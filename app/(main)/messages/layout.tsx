"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isMainPage = pathname === "/messages";

  return (
    <div className="p-4 py-2 md:py-4">
      <header className="w-full flex items-center justify-between py-4 border-b-2 border-slate-300">
        <h2 className="text-xl font-semibold">Send Message</h2>
        {isMainPage && (
          <Link href="/home">
            <Button size="icon" variant="ghost">
              <ArrowLeftFromLine className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </header>
      {children}
    </div>
  );
};

export default MessageLayout;
