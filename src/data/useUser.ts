import API from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  gmail?: string;
  avatar?: string;
}

const useUser = () => {
  const query = useQuery<User>({
    queryKey: ["current-user"],
    queryFn: () => API.get("/users").then((res) => res.data),
    retry: 0,
  });

  return query;
};

export default useUser;
