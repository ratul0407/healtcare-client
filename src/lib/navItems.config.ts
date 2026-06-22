import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      title: "Dashboard",
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["PATIENT", "DOCTOR", "ADMIN"],
        },
        {
          title: "MY Profile",
          href: `${defaultDashboard}/profile`,
          icon: "User",
          roles: ["PATIENT", "DOCTOR", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/dashboard/my-profile/change-password",
          icon: "Settings",
          roles: ["PATIENT"],
        },
      ],
    },
  ];
};
export const patientNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-appointments",
        icon: "Calendar",
        roles: ["DOCTOR"],
      },
      {
        title: "Book Appointment",
        href: "/consultation",
        icon: "ClipboardList",
        roles: ["PATIENT"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText",
        roles: ["PATIENT"],
      },
      {
        title: "Health Records",
        href: "/",
        icon: "Activity",
        roles: ["PATIENT"],
      },
    ],
  },
];
export const doctorNavItems: NavSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "Appointments",
        href: "/doctor/dashboard/appointments",
        icon: "Calendar",
        badge: "3",
        roles: ["DOCTOR"],
      },
      {
        title: "My Schedules",
        href: "/doctor/dashboard/my-schedules",
        icon: "Clock",
        roles: ["DOCTOR"],
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/prescriptions",
        icon: "FileText",
        roles: ["DOCTOR"],
      },
    ],
  },
];
export const AdminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Doctors",
        href: "/admin/dashboard/doctors-management",
        icon: "sStethoscope",
        roles: ["ADMIN"],
      },
      {
        title: "Patients",
        href: "/admin/dashboard/patients",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments",
        icon: "Calendar",
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules",
        icon: "Calender",
        roles: ["ADMIN"],
      },
      {
        title: "Specialties",
        href: "/admin/dashboard/specialties-management",
        icon: "Box",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);
  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...AdminNavItems];
    case "DOCTOR":
      return [...commonNavItems, ...doctorNavItems];
    case "PATIENT":
      return [...commonNavItems, ...patientNavItems];
    default:
      return commonNavItems;
  }
};
