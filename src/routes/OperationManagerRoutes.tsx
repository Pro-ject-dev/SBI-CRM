import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import OrderManagementList from "../features/operationManager/OrderManagementList";
import AdminDashboard from "../pages/admin/AdminDashboard";
import OperationManagerLayout from "../layouts/OperationManagerLayout";

const OperationManagerRoutes = () => (
  <>
    <Route
      path="/operation-manager"
      element={
        <ProtectedRoute allowedRoles={["operation_manager"]}>
          <OperationManagerLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="order-management" element={<OrderManagementList />} />
    </Route>
  </>
);

export default OperationManagerRoutes;
