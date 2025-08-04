import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import MasterForm from "../pages/admin/MasterForm";
import ProductManagement from "../pages/admin/ProductManagement";
import EstimationPdfGeneration from "../pages/admin/EstimationPdfGeneration";
import WarehouseOverview from "../pages/admin/WarehouseOverview";


const AdminRoutes = () => (
  <>
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="master-form" element={<MasterForm />} />
      <Route path="product-management" element={<ProductManagement />} />
      <Route path="view-products" element={<ProductManagement />} />
      <Route path="pdf-generation" element={<EstimationPdfGeneration />} />
      <Route path="warehouse" element={<WarehouseOverview />} />

    </Route>
  </>
);

export default AdminRoutes;
