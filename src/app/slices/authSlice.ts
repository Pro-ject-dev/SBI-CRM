import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse, UserRole } from "../../types/auth";

interface AuthState {
  userName: string | null;
  role: UserRole | null;
  roleDisplayName: string | null;
  idToken: string | null;
  refreshToken: string | null;
  email: string | null;
}

const initialState: AuthState = {
  userName: null,
  role: null,
  roleDisplayName: null,
  idToken: null,
  refreshToken: null,
  email: null,
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
    },
    restoreCredentials: (state) => {
      // Restore authentication state from localStorage on page refresh
      const storedToken = localStorage.getItem("authToken");
      const storedRole = localStorage.getItem("role");
      const storedRoleDisplayName = localStorage.getItem("roleDisplayName");
      
      if (storedToken && storedRole) {
        state.idToken = storedToken;
        state.role = storedRole;
        state.roleDisplayName = storedRoleDisplayName;
        state.refreshToken = storedToken; // Using same token as refresh for now
        // Note: userName and email are not stored in localStorage, so they remain null
        // This is acceptable as the main purpose is to maintain authentication state
      }
    },
    logout: (state) => {
      state.userName = null;
      state.role = null;
      state.roleDisplayName = null;
      state.idToken = null;
      state.refreshToken = null;
      state.email = null;
    },
  },
});

export const { setCredentials, restoreCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
