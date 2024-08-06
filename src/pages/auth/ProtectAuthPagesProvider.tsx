import useUser from "@/data/useUser";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectAuthPagesProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useUser();

  return !user ? children : <Navigate to="/" replace />;
};

export default ProtectAuthPagesProvider;
