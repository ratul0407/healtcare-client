import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { UserRole } from "@/lib/authUtils";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();

  const navItems = getNavItemsByRole(userInfo?.role as UserRole);
  return <DashboardNavbarContent userInfo={userInfo} navItems={navItems} />;
};

export default DashboardNavbar;
