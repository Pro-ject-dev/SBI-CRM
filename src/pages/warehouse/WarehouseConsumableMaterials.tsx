import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConsumableMaterialsManagement from "../../features/warehouse/ConsumableMaterialsManagement";

const WarehouseConsumableMaterials = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<"list">("list");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get("view");
    if (view === "form") {
      setCurrentView("list"); // Always show list for consumable materials
    }
  }, [location]);

  return (
    <div>
      <ConsumableMaterialsManagement />
    </div>
  );
};

export default WarehouseConsumableMaterials;
