import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import MasterForm from "../pages/admin/MasterForm";
import ProductManagement from "../pages/admin/ProductManagement";
// import EstimationPdfGeneration from "../pages/admin/EstimationPdfGeneration";
import WarehouseOverview from "../pages/admin/WarehouseOverview";
import PurchaseOrdersApproval from "../pages/admin/PurchaseOrdersApproval";
import RawMaterialsManagement from "../features/admin/RawMaterialsManagement";
import LeadManagement from "../features/admin/LeadManagement";
import OrderManagement from "../features/admin/OrderManagement";
import EmployeeManagement from "../features/admin/EmployeeManagement";


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
      <Route path="leads" element={<LeadManagement />} />
      <Route path="orders" element={<OrderManagement />} />
      <Route path="employees" element={<EmployeeManagement />} />
      <Route path="master-form" element={<MasterForm />} />
      <Route path="product-management" element={<ProductManagement />} />
      <Route path="view-products" element={<ProductManagement />} />
      {/* <Route path="pdf-generation" element={<EstimationPdfGeneration />} /> */}
      <Route path="warehouse" element={<WarehouseOverview />} />
      <Route path="purchase-orders-approval" element={<PurchaseOrdersApproval />} />
      <Route path="raw-materials" element={<RawMaterialsManagement />} />

    </Route>
  </>
);

export default AdminRoutes;
