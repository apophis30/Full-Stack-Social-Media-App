import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="py-24 flex justify-center items-center">
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="bg-white rounded-lg shadow-sm px-4 py-5 text-center">
          Welcome to LoopSocial
        </h2>
        <Image
          src="/assets/home-illustration.jpg"
          height={500}
          width={500}
          alt="Social Media App"
          className="w-[300px] md:w-[500px] aspect-square rounded-lg"
        />
        <SignedIn>
          <Link href="/home">
            <Button
              size="lg"
              variant="custom"
              className="flex items-center justify-center gap-2 w-full shadow-sm"
            >
              Go to home
              <Image src="/assets/home.svg" width={24} height={24} alt="Home" />
            </Button>
          </Link>
        </SignedIn>
      </div>
    </div>
  );
};

export default Page;
