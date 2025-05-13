import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { adminMenuItems } from "../../constants/admin/sideMenu";
import { salesManagerMenuItems } from "../../constants/salesManager/sideMenu";
import Sidebar from "./SideBar";

const RoleBasedSidebar = () => {
  //   const role = useSelector((state: RootState) => state.auth.role);
  const role = localStorage.getItem("role");
  const sideMenuItems =
    role === "admin" ? adminMenuItems : salesManagerMenuItems;

  return <Sidebar sideMenuItems={sideMenuItems} />;
};

export default RoleBasedSidebar;
