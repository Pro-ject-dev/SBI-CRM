import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import type { SideBar } from "../../types/sideBar";

export const operationManagerMenuItems: SideBar[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/operation-manager/dashboard",
  },
  {
    id: "ordermanagement",
    label: "Order Management",
    icon: InventoryIcon,
    path: "/operation-manager/order-management",
  },
];
