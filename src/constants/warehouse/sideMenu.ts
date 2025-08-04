import {
  Inventory as InventoryIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
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
    id: "vendors",
    label: "Vendors",
    icon: PeopleIcon,
    path: "/warehouse/vendors",
  },
  {
    id: "purchaseorders",
    label: "Purchase Orders",
    icon: ShoppingCartIcon,
    path: "/warehouse/purchase-orders",
  },
  {
    id: "stockassignment",
    label: "Stock Assignment",
    icon: AssignmentIcon,
    path: "/warehouse/stock-assignment",
  },
];