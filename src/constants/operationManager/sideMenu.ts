import {
  Dashboard as DashboardIcon,
  PrecisionManufacturing as PrecisionManufacturingIcon,
  Work as WorkIcon,
  AddShoppingCart as AddShoppingCartIcon,
  HelpOutline as HelpOutlineIcon,
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
    icon: PrecisionManufacturingIcon,
    path: "/operation-manager/order-management",
  },
  {
    id: "jobcards",
    label: "Job Cards",
    icon: WorkIcon,
    path: "/operation-manager/job-cards",
  },
  {
    id: "consumablerequests",
    label: "Consumable Requests",
    icon: AddShoppingCartIcon,
    path: "/operation-manager/consumable-requests",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpOutlineIcon,
    path: "/operation-manager/help",
  },
];
