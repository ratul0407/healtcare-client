"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/types/user.interface";
import { Bell, Menu, Search } from "lucide-react";
import UserDropDown from "./UserDropDown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import { NavSection } from "@/types/dashboard.interface";
import { useEffect, useState } from "react";

interface DashboardNavbarContentProps {
  userInfo: UserInfo | null;
  navItems: NavSection[];
}
const DashboardNavbarContent = ({
  userInfo,
  navItems,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSmallScreen();
    window.addEventListener("resize", checkSmallScreen);
    return () => {
      window.removeEventListener("resize", checkSmallScreen);
    };
  }, []);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role as UserRole);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6 ">
        <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <DashboardMobileSidebar
              userInfo={userInfo as UserInfo}
              navItems={navItems as NavSection[]}
              dashboardHome={dashboardHome}
            />
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-9" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={"outline"} size={"icon"} className="relative">
            <Bell className="size-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <UserDropDown userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
