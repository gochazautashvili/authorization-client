import useUser from "@/data/useUser";
import { Loader2 } from "lucide-react";

const Home = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <Loader2 className="mt-20 animate-spin mx-auto" />;
  }

  return (
    <main className="container flex items-center justify-center mt-20 text-3xl font-semibold">
      {user ? (
        <p className="text-green-400">Successfully sign in</p>
      ) : (
        <p className="text-destructive">You are unauthorized</p>
      )}
    </main>
  );
};

export default Home;
