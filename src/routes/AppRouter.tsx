import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AdminRoutes from "./AdminRoutes";
import SalesManagerRoutes from "./SalesManagerRoutes";
import WarehouseRoutes from "./WarehouseRoutes";
import LoginPage from "../pages/LoginPage";
import OperationManagerRoutes from "./OperationManagerRoutes";
import type { RootState } from "../app/store";

const AppRouter = () => {
  const authState = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    console.log("AppRouter - Current auth state:", authState);
    console.log("AppRouter - Current location:", window.location.pathname);
  }, [authState]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {AdminRoutes()}
      {SalesManagerRoutes()}
      {OperationManagerRoutes()}
      {WarehouseRoutes()}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
