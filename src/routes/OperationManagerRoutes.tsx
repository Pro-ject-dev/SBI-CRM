import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import OrderManagementList from "../features/operationManager/OrderManagementList";
import OperationManagerDashboard from "../features/operationManager/OperationManagerDashboard";
import JobCardManagement from "../features/operationManager/JobCardManagement";
import OperationManagerLayout from "../layouts/OperationManagerLayout";
import HelpSupport from "../pages/HelpSupport";

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
      <Route key="dashboard" path="dashboard" element={<OperationManagerDashboard />} />
      <Route key="order-management" path="order-management" element={<OrderManagementList />} />
      <Route key="job-cards" path="job-cards" element={<JobCardManagement />} />
      <Route key="help" path="help" element={<HelpSupport />} />
    </Route>
  </>
);

export default OperationManagerRoutes;
