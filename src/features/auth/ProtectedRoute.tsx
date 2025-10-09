import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import type { RootState } from "../../app/store";

interface ProtectedRouteProps {
	children: JSX.Element;
	allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
	// Get role from Redux store instead of localStorage
	const { role, isInitialized } = useSelector((state: RootState) => state.auth as any);
	
	if (!isInitialized) {
		// Show loading spinner instead of null to prevent layout unmounting
		return (
			<Box 
				display="flex" 
				justifyContent="center" 
				alignItems="center" 
				minHeight="100vh"
				sx={{ backgroundColor: '#f5f5f5' }}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (!role) {
		return <Navigate to="/login" replace />;
	}

	if (!allowedRoles.includes(role)) {
		return <Navigate to="/unauthorized" replace />;
	}
	
	return children;
};

export default ProtectedRoute;
