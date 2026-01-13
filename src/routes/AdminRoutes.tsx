import { Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ConsumableMaterialsManagement from "../features/admin/ConsumableMaterialsManagement";
import AdminLayout from "../layouts/AdminLayout";
import MasterForm from "../pages/admin/MasterForm";
import ProductManagement from "../pages/admin/ProductManagement";
import PurchaseOrdersApproval from "../pages/admin/PurchaseOrdersApproval";
import RawMaterialsManagement from "../features/admin/RawMaterialsManagement";
import LeadManagement from "../features/admin/LeadManagement";
import OrderManagement from "../features/admin/OrderManagement";
import EmployeeManagement from "../features/admin/EmployeeManagement";
import HelpSupport from "../pages/HelpSupport";
import RawMaterialsLog from "../features/admin/RawMaterialsLog";
import ConsumableMaterialsLog from "../features/admin/ConsumableMaterialsLog";
import VendorsManagement from "../features/warehouse/VendorsManagement";

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
      <Route
        path="purchase-orders-approval"
        element={<PurchaseOrdersApproval />}
      />
      <Route path="raw-materials" element={<RawMaterialsManagement />} />
      <Route path="raw-materials-log" element={<RawMaterialsLog />} />
      <Route path="consumable-materials" element={<ConsumableMaterialsManagement />} />
      <Route path="consumable-materials-log" element={<ConsumableMaterialsLog />} />
      <Route path="vendors" element={<VendorsManagement />} />
      <Route path="help" element={<HelpSupport />} />
    </Route>
  </>
);

export default AdminRoutes;
