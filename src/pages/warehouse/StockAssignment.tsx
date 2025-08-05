import StockAssignmentManagement from "@/features/warehouse/StockAssignmentManagement";
import WarehouseLayout from "@/layouts/WarehouseLayout";

const StockAssignment = () => {
  return (
    <WarehouseLayout>
      <StockAssignmentManagement />
    </WarehouseLayout>
  );
};

export default StockAssignment;
