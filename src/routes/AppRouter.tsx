import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AdminRoutes from "./AdminRoutes";
import SalesManagerRoutes from "./SalesManagerRoutes";
import WarehouseRoutes from "./WarehouseRoutes";
import PurchaseManagerRoutes from "./PurchaseManagerRoutes";
import LoginPage from "../pages/LoginPage";
import OperationManagerRoutes from "./OperationManagerRoutes";
import { restoreCredentials } from "../app/slices/authSlice";
import type { RootState } from "../app/store";

const AppRouter = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);



  useEffect(() => {
    console.log("AppRouter - Current auth state:", authState);
    console.log("AppRouter - Current location:", window.location.pathname);
  }, [authState]);

  if (!authState.isInitialized) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {AdminRoutes()}
      {SalesManagerRoutes()}
      {OperationManagerRoutes()}
      {WarehouseRoutes()}
      {PurchaseManagerRoutes()}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
