import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import type { SideBar } from "../../types/sideBar";
import { BarChartIcon, ListIcon } from "lucide-react";

export const salesManagerMenuItems: SideBar[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/sales/dashboard",
  },
  {
    id: "estimation",
    label: "Estimation",
    icon: PeopleIcon,
    path: "/sales/estimation",
  },
  {
    id: "leads",
    label: "Leads Generation",
    icon: BarChartIcon,
    path: "/sales/leadsGeneration",
  },
  {
    id: "orders",
    label: "Orders Management",
    icon: ListIcon,
    path: "/sales/orderManagement",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpOutlineIcon,
    path: "/sales/help",
  }
];
