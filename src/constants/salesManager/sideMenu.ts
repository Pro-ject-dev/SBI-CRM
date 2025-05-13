import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import type { SideBar } from "../../types/sideBar";

export const salesManagerMenuItems: SideBar[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/admin/dashboard",
  },
  {
    id: "estimation",
    label: "Estimation",
    icon: PeopleIcon,
    path: "/admin/estimation",
  },
];
