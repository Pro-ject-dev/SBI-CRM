import {
  Dashboard as DashboardIcon,
  Grain as GrainIcon,
  BuildCircle as BuildCircleIcon,
  AssignmentInd as AssignmentIndIcon,
  PendingActions as PendingActionsIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import type { SideBar } from "../../types/sideBar";

export const warehouseMenuItems: SideBar[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/store/dashboard",
  },
  {
    id: "rawmaterials",
    label: "Raw Materials",
    icon: GrainIcon,
    path: "/store/raw-materials",
  },
  {
    id: "consumablematerials",
    label: "Consumable Materials",
    icon: BuildCircleIcon,
    path: "/store/consumable-materials",
  },
  {
    id: "stockassignment",
    label: "Stock Assignment",
    icon: AssignmentIndIcon,
    path: "/store/stock-assignment",
  },
  {
    id: "consumablerequests",
    label: "Consumable Requests",
    icon: PendingActionsIcon,
    path: "/store/consumable-requests",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpOutlineIcon,
    path: "/store/help",
  },
];
