import { useSelector } from "react-redux";
import { adminMenuItems } from "../../constants/admin/sideMenu";
import { operationManagerMenuItems } from "../../constants/operationManager/sideMenu";
import { salesManagerMenuItems } from "../../constants/salesManager/sideMenu";
import { warehouseMenuItems } from "../../constants/warehouse/sideMenu";
import Sidebar from "./SideBar";
import type { RootState } from "../../app/store";

const RoleBasedSidebar = () => {
  // Get role from Redux store instead of localStorage
  const { role } = useSelector((state: RootState) => state.auth);
  
  let sideMenuItems;
  switch (role) {
    case "admin":
      sideMenuItems = adminMenuItems;
      break;
    case "sales_manager":
      sideMenuItems = salesManagerMenuItems;
      break;
    case "warehouse_manager":
      sideMenuItems = warehouseMenuItems;
      break;
    case "operation_manager":
      sideMenuItems = operationManagerMenuItems;
      break;
    default:
      // Fallback to operation manager if no role is set
      sideMenuItems = operationManagerMenuItems;
  }

  // Don't render sidebar if no role is available
  if (!role) {
    return null;
  }

  return <Sidebar sideMenuItems={sideMenuItems} />;
};

export default RoleBasedSidebar;
