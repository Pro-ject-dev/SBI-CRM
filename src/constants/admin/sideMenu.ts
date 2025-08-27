import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon, // For Orders
  Group as GroupIcon, // For Employees
  Category as CategoryIcon, // For Raw Materials
  Assignment as AssignmentIcon, // For Leads (or another suitable icon)
} from "@mui/icons-material";

import WarehouseIcon from "@mui/icons-material/Warehouse";

import type { SideBar } from "../../types/sideBar";

export const adminMenuItems: SideBar[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/admin/dashboard",
  },
  {
    id: "leads",
    label: "Leads",
    icon: AssignmentIcon,
    path: "/admin/leads",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCartIcon,
    path: "/admin/orders",
  },
  {
    id: "poapproval",
    label: "PO Approval",
    icon: InventoryIcon,
    path: "/admin/purchase-orders-approval",
  },
  {
    id: "productmanagement",
    label: "Product Management",
    icon: InventoryIcon,
    path: "/admin/product-management",
  },
  {
    id: "rawmaterials",
    label: "Raw Materials",
    icon: CategoryIcon,
    path: "/admin/raw-materials",
  },
  {
    id: "employees",
    label: "Employees",
    icon: GroupIcon,
    path: "/admin/employees",
  },
  {
    id: "masterforms",
    label: "Master Forms",
    icon: PeopleIcon,
    path: "/admin/master-form",
  },
];
