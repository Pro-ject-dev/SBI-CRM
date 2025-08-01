import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import SalesManagerRoutes from "./SalesManagerRoutes";
import WarehouseRoutes from "./WarehouseRoutes";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {AdminRoutes()}
      {SalesManagerRoutes()}
      {WarehouseRoutes()}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
