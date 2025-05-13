import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import SalesManagerDashboard from "../pages/salesManager/SalesManagerDashboard";
import SalesManagerLayout from "../layouts/SalesManagerLayout";

const SalesManagerRoutes = () => (
  <>
    <Route
      path="/sales"
      element={
        <ProtectedRoute allowedRoles={["sales_manager"]}>
          <SalesManagerLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<SalesManagerDashboard />} />
    </Route>
  </>
);

export default SalesManagerRoutes;
