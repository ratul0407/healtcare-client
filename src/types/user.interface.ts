import { UserRole } from "@/lib/authUtils";

export interface UserInfo {
  role: UserRole;
  name: string;
  email: string;
}
