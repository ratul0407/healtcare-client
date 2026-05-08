"use client";

import { logoutUser } from "@/services/auth/logout";
import { Button } from "../ui/button";

const LogOutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return <Button onClick={handleLogout}>Log Out</Button>;
};

export default LogOutButton;
