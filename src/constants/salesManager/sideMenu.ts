import {
  Dashboard as DashboardIcon,
  Calculate as CalculateIcon,
  PersonAddAlt1 as PersonAddAlt1Icon,
  Receipt as ReceiptIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import type { SideBar } from "../../types/sideBar";

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
    icon: CalculateIcon,
    path: "/sales/estimation",
  },
  {
    id: "leads",
    label: "Leads Generation",
    icon: PersonAddAlt1Icon,
    path: "/sales/leadsGeneration",
  },
  {
    id: "orders",
    label: "Orders Management",
    icon: ReceiptIcon,
    path: "/sales/orderManagement",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpOutlineIcon,
    path: "/sales/help",
  }
];
