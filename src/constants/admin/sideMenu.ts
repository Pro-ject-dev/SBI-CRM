import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import type { SideBar } from "../../types/sideBar";

export const adminMenuItems: SideBar[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/admin/dashboard",
  },
  {
    id: "masterforms",
    label: "Master Forms",
    icon: PeopleIcon,
    path: "/admin/master-form",
  },
  {
    id: "viewproducts",
    label: "View Products",
    icon: InventoryIcon,
    path: "/admin/view-products",
  },
  {
    id: "pdfgeneration",
    label: "Pdf Generation",
    icon: PictureAsPdfIcon,
    path: "/admin/pdf-generation",
  },
];
