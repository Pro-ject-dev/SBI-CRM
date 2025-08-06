import WarehouseLayout from "../../layouts/WarehouseLayout";
import WarehouseOrdersManagement from "../../features/warehouse/WarehouseOrdersManagement";

const StockAssignment = () => {
  return (
    <WarehouseLayout>
      <WarehouseOrdersManagement />
    </WarehouseLayout>
  );
};

export default StockAssignment;
