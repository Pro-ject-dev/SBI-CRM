import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse, UserRole } from "../../types/auth";

interface AuthState {
	userName: string | null;
	role: UserRole | null;
	roleDisplayName: string | null;
	idToken: string | null;
	refreshToken: string | null;
	email: string | null;
	isInitialized?: boolean;
}

const initialState: AuthState = {
	userName: null,
	role: null,
	roleDisplayName: null,
	idToken: null,
	refreshToken: null,
	email: null,
	isInitialized: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<LoginResponse>) => {
			state.userName = action.payload.userName;
			state.role = action.payload.role;
			state.roleDisplayName = action.payload.roleDisplayName;
			state.idToken = action.payload.idToken;
			state.refreshToken = action.payload.refreshToken;
			state.email = action.payload.email || null;
			state.isInitialized = true;
		},
	restoreCredentials: (state) => {
		// Restore authentication state from localStorage on page refresh
		const storedToken = localStorage.getItem("authToken");
		const storedRole = localStorage.getItem("role");
		const storedRoleDisplayName = localStorage.getItem("roleDisplayName");
		const storedUserName = localStorage.getItem("userName");
		
		if (storedToken && storedRole) {
			state.idToken = storedToken;
			state.role = storedRole as UserRole;
			state.roleDisplayName = storedRoleDisplayName;
			state.userName = storedUserName;
			state.refreshToken = storedToken; // Using same token as refresh for now
		}
		state.isInitialized = true;
	},
	initializeAuth: (state) => {
		// Mark as initialized immediately to prevent loading state
		state.isInitialized = true;
	},
		logout: (state) => {
			state.userName = null;
			state.role = null;
			state.roleDisplayName = null;
			state.idToken = null;
			state.refreshToken = null;
			state.email = null;
			state.isInitialized = true;
		},
	},
});

export const { setCredentials, restoreCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
