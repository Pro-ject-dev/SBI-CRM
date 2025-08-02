import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import RoleBasedSidebar from "../components/Layout/RoleBasedSideBar";
import Header from "../components/Layout/Header";
import CustomToast from "../components/UI/CustomToast";

const OperationManagerLayout: React.FC = () => {
  return (
    <Box display="flex" minHeight="100vh">
      <RoleBasedSidebar />

      <Box flex={1} display="flex" flexDirection="column">
        <Header />
        <CustomToast />
        <Box p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default OperationManagerLayout;
