import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VendorsManagement from "../../features/warehouse/VendorsManagement";
import VendorsForm from "../../features/warehouse/VendorsForm";

const WarehouseVendors = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<"list" | "form">("list");

  useEffect(() => {
    if (location.pathname.includes("/form")) {
      setCurrentView("form");
    } else {
      setCurrentView("list");
    }
  }, [location.pathname]);

  return (
    <Box>
      {currentView === "form" ? (
        <VendorsForm />
      ) : (
        <VendorsManagement />
      )}
    </Box>
  );
};

export default WarehouseVendors;