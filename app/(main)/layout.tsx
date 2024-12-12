import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Toaster />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
