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

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
