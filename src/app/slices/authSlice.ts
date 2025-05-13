import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse, UserRole } from "../../types/auth";

interface AuthState {
  userName: string | null;
  role: UserRole | null;
  idToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  userName: null,
  role: null,
  idToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.userName = null;
      state.role = null;
      state.idToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
