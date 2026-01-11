import {
    Dashboard as DashboardIcon,
    Storefront as StorefrontIcon,
    ShopTwo as ShopTwoIcon,
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
        icon: StorefrontIcon,
        path: "/purchase-manager/vendors",
    },
    {
        id: "purchaseorders",
        label: "Purchase Orders",
        icon: ShopTwoIcon,
        path: "/purchase-manager/purchase-orders",
    },
    {
        id: "help",
        label: "Help & Support",
        icon: HelpOutlineIcon,
        path: "/purchase-manager/help",
    },
];
