import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import SalesManagerRoutes from "./SalesManagerRoutes";
import LoginPage from "../pages/LoginPage";
import OperationManagerRoutes from "./OperationManagerRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {AdminRoutes()}
      {SalesManagerRoutes()}
      {OperationManagerRoutes()}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
