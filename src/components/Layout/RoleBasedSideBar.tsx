import { adminMenuItems } from "../../constants/admin/sideMenu";
import { operationManagerMenuItems } from "../../constants/operationManager/sideMenu";
import { salesManagerMenuItems } from "../../constants/salesManager/sideMenu";
import Sidebar from "./SideBar";

const RoleBasedSidebar = () => {
  const role = localStorage.getItem("role");

  const selectMenuItems = (role: string | null) => {
    switch (role) {
      case "admin":
        return adminMenuItems;
      case "sales_manager":
        return salesManagerMenuItems;
      default:
        return operationManagerMenuItems;
    }
  };
  const sideMenuItems = selectMenuItems(role);

  return <Sidebar sideMenuItems={sideMenuItems} />;
};

export default RoleBasedSidebar;
