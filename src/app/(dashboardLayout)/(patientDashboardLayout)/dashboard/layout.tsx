import LogOutButton from "@/components/shared/LogOutButton";
import { getCookie } from "@/services/auth/tokenHandler";
import React from "react";

const PatientDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const accessToken = await getCookie("accessToken");
  return (
    <div>
      {accessToken && <LogOutButton />}
      {children}
    </div>
  );
};

export default PatientDashboardLayout;
