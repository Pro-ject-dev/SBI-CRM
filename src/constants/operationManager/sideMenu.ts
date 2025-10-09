import {
	Dashboard as DashboardIcon,
	Inventory as InventoryIcon,
	Assignment as AssignmentIcon,
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
		icon: InventoryIcon,
		path: "/operation-manager/order-management",
	},
	{
		id: "jobcards",
		label: "Job Cards",
		icon: AssignmentIcon,
		path: "/operation-manager/job-cards",
	},
	{
		id: "help",
		label: "Help & Support",
		icon: HelpOutlineIcon,
		path: "/operation-manager/help",
	},
];
