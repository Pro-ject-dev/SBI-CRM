
export type UserRole = "admin" | "sales_manager" | "warehouse_manager" | "operation_manager";


export interface LoginResponse {
  userName: string;
  role: UserRole;
  idToken: string;
  refreshToken: string;
  email?: string;
}
