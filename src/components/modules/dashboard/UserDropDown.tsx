"use client";

import LogOutButton from "@/components/shared/LogOutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logout";
import { UserInfo } from "@/types/user.interface";
import { Settings, User } from "lucide-react";
import Link from "next/link";

interface UserDropDownProps {
  userInfo: UserInfo | null;
}
const UserDropDown = ({ userInfo }: UserDropDownProps) => {
  const handleLogOut = async () => {
    await logoutUser();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="rounded-full">
          <span className="text-sm font-semibold">
            {userInfo && userInfo.name.charAt(0).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo?.email}</p>
            <p className="text-sm text-muted-foreground">{userInfo?.role}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/my-profile"} className="cursor-pointer">
              <User className="mr-2 size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/change-password`} className="cursor-pointer">
              <Settings className="mr-2 size-4" /> Change Password
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogOut}
            className="cursor-pointer text-red-600"
          >
            <LogOutButton />
          </DropdownMenuItem>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
