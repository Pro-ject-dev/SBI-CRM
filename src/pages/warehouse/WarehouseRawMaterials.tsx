import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import RawMaterialsManagement from "../../features/warehouse/RawMaterialsManagement";
import RawMaterialsForm from "../../features/warehouse/RawMaterialsForm";

const WarehouseRawMaterials = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
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
        <RawMaterialsForm />
      ) : (
        <RawMaterialsManagement />
      )}
    </Box>
  );
};

export default WarehouseRawMaterials;