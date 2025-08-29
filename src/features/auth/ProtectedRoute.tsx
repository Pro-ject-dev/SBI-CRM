import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../app/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  // Get role from Redux store instead of localStorage
  const { role } = useSelector((state: RootState) => state.auth);
  
  console.log("ProtectedRoute - Current role:", role);
  console.log("ProtectedRoute - Allowed roles:", allowedRoles);
  console.log("ProtectedRoute - Role check result:", role && allowedRoles.includes(role));

  if (!role) {
    console.log("ProtectedRoute - No role found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("ProtectedRoute - Role not allowed, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }
  
  console.log("ProtectedRoute - Access granted");
  return children;
};

export default ProtectedRoute;
