import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default Page;
