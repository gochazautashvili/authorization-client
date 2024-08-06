import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "./Avatar";
import useUser from "@/data/useUser";
import API from "@/lib/api";
import { LogOut } from "lucide-react";
import DefaultAvatar from "@/assets/default_user_avatar.jpg";

const UserButton = () => {
  const { data: user } = useUser();

  const sign_out = async () => {
    await API.post("/users/sign-out");

    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar avatar={user?.avatar || DefaultAvatar} size={56} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={sign_out}>
          <LogOut className="mr-2 size-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
