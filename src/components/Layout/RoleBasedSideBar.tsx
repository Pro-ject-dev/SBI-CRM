import { adminMenuItems } from "../../constants/admin/sideMenu";
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
    case "warehouse_manager":
      sideMenuItems = warehouseMenuItems;
      break;
    default:
      sideMenuItems = salesManagerMenuItems;
  }

  return <Sidebar sideMenuItems={sideMenuItems} />;
};

export default RoleBasedSidebar;
