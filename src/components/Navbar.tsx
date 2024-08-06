import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "./Logo";
import useUser from "@/data/useUser";
import UserButton from "./UserButton";

const Navbar = () => {
  const { data: user, isLoading } = useUser();

  return (
    <header className="sticky top-0 bg-white z-50">
      <nav className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="size-12 rounded-full animate-pulse bg-gray-500"></div>
          )}
          {user && !isLoading && <UserButton />}
          {!user && !isLoading && (
            <>
              <Button
                variant="outline"
                className="border-[#2F80ED] text-[#2F80ED]"
                asChild
              >
                <Link to="/auth/sign-up">Register</Link>
              </Button>
              <Button className="hover:bg-[#2F90ED]" asChild>
                <Link to="/auth/sign-in">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
