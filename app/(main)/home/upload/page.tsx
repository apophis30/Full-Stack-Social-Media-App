import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import { MediaUploader } from "./media-uploader";

const page = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between border-b-2 border-slate-300 pb-4">
        <h1 className="text-xl">Upload A Photo</h1>
        <Link href="/home">
          <Button size="icon" variant="ghost">
            <ArrowLeftFromLine className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <MediaUploader />
    </div>
  );
};

export default page;
