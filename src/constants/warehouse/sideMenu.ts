import {
  Inventory as InventoryIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
  HelpOutline as HelpOutlineIcon,
  Category as CategoryIcon,
  RequestPage as RequestPageIcon,
} from "@mui/icons-material";
import type { SideBar } from "../../types/sideBar";

export const warehouseMenuItems: SideBar[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/warehouse/dashboard",
  },
  {
    id: "rawmaterials",
    label: "Raw Materials",
    icon: InventoryIcon,
    path: "/warehouse/raw-materials",
  },
  {
    id: "consumablematerials",
    label: "Consumable Materials",
    icon: CategoryIcon,
    path: "/warehouse/consumable-materials",
  },
  {
    id: "stockassignment",
    label: "Stock Assignment",
    icon: AssignmentIcon,
    path: "/warehouse/stock-assignment",
  },
  {
    id: "consumablerequests",
    label: "Consumable Requests",
    icon: RequestPageIcon,
    path: "/warehouse/consumable-requests",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpOutlineIcon,
    path: "/warehouse/help",
  },
];
