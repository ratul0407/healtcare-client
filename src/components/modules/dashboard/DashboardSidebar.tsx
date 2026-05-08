import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { UserInfo } from "@/types/user.interface";
import { NavSection } from "@/types/dashboard.interface";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = [
    {
      title: "Consultation",
      items: [
        {
          title: "Patient",
          href: "/patient/dashboard",
          icon: "User",
          description: "View patient details",
          roles: ["PATIENT"],
        },
      ],
    },
  ];
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
