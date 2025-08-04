import { adminMenuItems } from "../../constants/admin/sideMenu";
import { operationManagerMenuItems } from "../../constants/operationManager/sideMenu";
import { salesManagerMenuItems } from "../../constants/salesManager/sideMenu";
import { warehouseMenuItems } from "../../constants/warehouse/sideMenu";
import Sidebar from "./SideBar";

const RoleBasedSidebar = () => {
  const role = localStorage.getItem("role");
  
  let sideMenuItems;
  switch (role) {
    case "admin":
      sideMenuItems = adminMenuItems;
      break;
    case "sales_manager":
      sideMenuItem s= salesManagerMenuItems;
      break;
    case "warehouse_manager":
      sideMenuItems = warehouseMenuItems;
      break;
    default:
      sideMenuItems = operationManagerMenuItems;
  }


  return <Sidebar sideMenuItems={sideMenuItems} />;
};

export default RoleBasedSidebar;
