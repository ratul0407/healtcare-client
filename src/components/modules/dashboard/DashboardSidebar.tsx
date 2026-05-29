import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import { UserInfo } from "@/types/user.interface";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = getNavItemsByRole(userInfo?.role as UserRole);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems as NavSection[]}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
