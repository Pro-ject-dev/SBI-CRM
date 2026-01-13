import {
  Dashboard as DashboardIcon,
  Leaderboard as LeaderboardIcon, // Leads
  ShoppingBag as ShoppingBagIcon, // Orders
  FactCheck as FactCheckIcon, // PO Approval
  Inventory2 as Inventory2Icon, // Product Management
  Grain as GrainIcon, // Raw Materials
  BuildCircle as BuildCircleIcon, // Consumable Materials
  HistoryEdu as HistoryEduIcon, // Raw Material Log
  ManageHistory as ManageHistoryIcon, // Consumable Log
  Badge as BadgeIcon, // Employees
  DynamicForm as DynamicFormIcon, // Master Forms
  HelpOutline as HelpOutlineIcon,
  Store as VendorIcon,
} from "@mui/icons-material";

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
    icon: LeaderboardIcon,
    path: "/admin/leads",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBagIcon,
    path: "/admin/orders",
  },
  {
    id: "poapproval",
    label: "PO Approval",
    icon: FactCheckIcon,
    path: "/admin/purchase-orders-approval",
  },
  {
    id: "productmanagement",
    label: "Product Management",
    icon: Inventory2Icon,
    path: "/admin/product-management",
  },
  {
    id: "rawmaterials",
    label: "Raw Materials",
    icon: GrainIcon,
    path: "/admin/raw-materials",
  },
  {
    id: "consumablematerials",
    label: "Consumable Materials",
    icon: BuildCircleIcon,
    path: "/admin/consumable-materials",
  },
  {
    id: "consumablematerialslog",
    label: "Consumable Log",
    icon: ManageHistoryIcon,
    path: "/admin/consumable-materials-log",
  },
  {
    id: "rawmaterialslog",
    label: "Raw Materials Log",
    icon: HistoryEduIcon,
    path: "/admin/raw-materials-log",
  },
  {
    id: "employees",
    label: "Employees",
    icon: BadgeIcon,
    path: "/admin/employees",
  },
  {
    id: "masterforms",
    label: "Master Forms",
    icon: DynamicFormIcon,
    path: "/admin/master-form",
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: VendorIcon,
    path: "/admin/vendors",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpOutlineIcon,
    path: "/admin/help",
  },
];
