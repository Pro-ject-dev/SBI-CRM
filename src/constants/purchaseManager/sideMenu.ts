import {
    People as PeopleIcon,
    ShoppingCart as ShoppingCartIcon,
    Dashboard as DashboardIcon,
    HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import type { SideBar } from "../../types/sideBar";

export const purchaseManagerMenuItems: SideBar[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: DashboardIcon,
        path: "/purchase-manager/dashboard",
    },
    {
        id: "vendors",
        label: "Vendors",
        icon: PeopleIcon,
        path: "/purchase-manager/vendors",
    },
    {
        id: "purchaseorders",
        label: "Purchase Orders",
        icon: ShoppingCartIcon,
        path: "/purchase-manager/purchase-orders",
    },
    {
        id: "help",
        label: "Help & Support",
        icon: HelpOutlineIcon,
        path: "/purchase-manager/help",
    },
];
