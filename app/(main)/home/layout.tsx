import NavMenu from "./nav-menu";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <main>
      <NavMenu />
      {children}
    </main>
  );
};

export default HomeLayout;
