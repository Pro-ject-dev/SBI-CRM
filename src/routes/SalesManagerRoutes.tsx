import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import SalesManagerDashboard from "../pages/salesManager/SalesManagerDashboard";
import SalesManagerLayout from "../layouts/SalesManagerLayout";
import LeadGenerationLayout from "../features/salesManager/leads/LeadGenerationLayout";
import OrderManagementLayout from "../features/salesManager/orders/OrdersManagementLayout";
import EstimationLayout from "../features/salesManager/estimation/EstimationLayout";

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
      <Route path="estimation" element={<EstimationLayout />} />
      <Route path="leadsGeneration" element={<LeadGenerationLayout />} />
      <Route path="orderManagement" element={<OrderManagementLayout />} />
    </Route>
  </>
);

export default SalesManagerRoutes;
