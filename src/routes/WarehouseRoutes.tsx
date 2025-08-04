import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import WarehouseDashboard from "../features/warehouse/WarehouseDashboard";
import WarehouseLayout from "../layouts/WarehouseLayout";
import WarehouseRawMaterials from "../pages/warehouse/WarehouseRawMaterials";
import WarehouseVendors from "../pages/warehouse/WarehouseVendors";
import WarehousePurchaseOrders from "../pages/warehouse/WarehousePurchaseOrders";

const WarehouseRoutes = () => (
  <>
    <Route
      path="/warehouse"
      element={
        <ProtectedRoute allowedRoles={["warehouse_manager", "admin"]}>
          <WarehouseLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<WarehouseDashboard />} />
      <Route path="raw-materials" element={<WarehouseRawMaterials />} />
      <Route path="raw-materials/form" element={<WarehouseRawMaterials />} />
      <Route path="vendors" element={<WarehouseVendors />} />
      <Route path="vendors/form" element={<WarehouseVendors />} />
      <Route path="purchase-orders" element={<WarehousePurchaseOrders />} />
      <Route path="purchase-orders/form" element={<WarehousePurchaseOrders />} />
      <Route path="stock-assignment" element={<WarehousePurchaseOrders />} />
    </Route>
  </>
);

export default WarehouseRoutes;