import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import PurchaseManagerLayout from "../layouts/PurchaseManagerLayout";
import WarehouseVendors from "../pages/warehouse/WarehouseVendors";
import PurchaseOrdersManagement from "../features/warehouse/PurchaseOrdersManagement";
import HelpSupport from "../pages/HelpSupport";
// Using Warehouse Dashboard as a placeholder if there's no specific Purchase Manager Dashboard
import WarehouseDashboard from "../features/warehouse/WarehouseDashboard";

const PurchaseManagerRoutes = () => (
    <>
        <Route
            path="/purchase-manager"
            element={
                <ProtectedRoute allowedRoles={["purchase_manager", "admin"]}>
                    <PurchaseManagerLayout />
                </ProtectedRoute>
            }
        >
            <Route path="dashboard" element={<WarehouseDashboard />} />
            <Route path="vendors" element={<WarehouseVendors />} />
            <Route path="purchase-orders" element={<PurchaseOrdersManagement />} />
            <Route path="help" element={<HelpSupport />} />
        </Route>
    </>
);

export default PurchaseManagerRoutes;
