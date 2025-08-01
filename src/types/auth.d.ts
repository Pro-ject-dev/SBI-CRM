export type UserRole = "admin" | "sales_manager" | "warehouse_manager";

export interface LoginResponse {
  userName: string;
  role: UserRole;
  idToken: string;
  refreshToken: string;
}
