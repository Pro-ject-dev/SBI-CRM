import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slices/authSlice";
import { useLoginMutation } from "../app/api/authApi";
import { addToast, removeToast, clearAllToasts } from "../app/slices/toastSlice";
import type { LoginResponse } from "../types/auth";
import type { RootState } from "../app/store";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  
  // Monitor auth state
  const authState = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    console.log("LoginPage - Current auth state:", authState);
    
    // If user is already authenticated, redirect to appropriate dashboard
    if (authState.role) {
      console.log("User already authenticated, redirecting to dashboard");
      if (authState.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (authState.role === "sales_manager") {
        navigate("/sales/dashboard", { replace: true });
      } else if (authState.role === "operation_manager") {
        navigate("/operation-manager/dashboard", { replace: true });
      } else if (authState.role === "warehouse_manager") {
        navigate("/warehouse/dashboard", { replace: true });
      }
    }
  }, [authState, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any existing toasts first
    dispatch(clearAllToasts());

    // Show loading message
    const loadingToastId = Date.now();
    dispatch(addToast({ 
      message: "Signing you in...", 
      type: "warning",
      id: loadingToastId
    }));

    try {
      console.log("Attempting login with:", { mail: email, password: "***" });
      const response = await login({ mail: email, password }).unwrap();
      console.log("Login response received:", response);

      // Remove loading toast
      dispatch(removeToast(loadingToastId));

      const allowedRoles = ["admin", "sales_manager", "operation_manager", "warehouse_manager"] as const;

      const { userName, role, roleDisplayName, idToken, refreshToken } = response;
      console.log("Extracted user data:", { userName, role, roleDisplayName, idToken: idToken ? "***" : null });

      if (allowedRoles.includes(role)) {
        console.log("Role is valid, dispatching credentials");
        dispatch(
          setCredentials({
            userName: userName,
            role: role,
            roleDisplayName: roleDisplayName,
            idToken: idToken,
            refreshToken: refreshToken,
            email: email,
          })
        );

        // Store token in localStorage for API calls
        localStorage.setItem("authToken", idToken);
        localStorage.setItem("role", role);
        localStorage.setItem("roleDisplayName", roleDisplayName);
        localStorage.setItem("api_endpoint", `/api/${role}`);

        console.log("Credentials stored, navigating to dashboard for role:", role);

        // Show success message and navigate
        setTimeout(() => {
          dispatch(addToast({ 
            message: `Welcome back, ${userName}! Login successful as ${roleDisplayName}.`, 
            type: "success" 
          }));

          // Test navigation
          console.log("Testing navigation...");
          setTimeout(() => {
            console.log("Navigation test - attempting to navigate");
            if (role === "admin") {
              console.log("Navigating to /admin/dashboard");
              navigate("/admin/dashboard", { replace: true });
            } else if (role === "sales_manager") {
              console.log("Navigating to /sales/dashboard");
              navigate("/sales/dashboard", { replace: true });
            } else if (role === "operation_manager") {
              console.log("Navigating to /operation-manager/dashboard");
              navigate("/operation-manager/dashboard", { replace: true });
            } else if (role === "warehouse_manager") {
              console.log("Navigating to /warehouse/dashboard");
              navigate("/warehouse/dashboard", { replace: true });
            }
          }, 100);
        }, 500);
      } else {
        console.error("Invalid role received:", role);
        dispatch(addToast({ 
          message: `Invalid role: ${role}. Please contact administrator.`, 
          type: "error" 
        }));
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Remove loading toast
      dispatch(removeToast(loadingToastId));
      
      // Enhanced error handling with specific messages
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error?.data?.message) {
        errorMessage = error.error.data.message;
      } else if (error?.status === 401) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error?.status === 404) {
        errorMessage = "Login service not found. Please contact administrator.";
      } else if (error?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error?.status === 0) {
        errorMessage = "Network error. Please check your internet connection.";
      }
      
      dispatch(addToast({ 
        message: errorMessage, 
        type: "error" 
      }));
    }
  };



  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side - Brand section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <div>
          <h1 className="text-white text-4xl font-bold">
            Sri Bramha Industries
          </h1>
          <p className="text-blue-200 mt-2">
            Manage your customer relationships with ease
          </p>
        </div>

        <div className="space-y-6">
          {/* Illustration */}
          <div className="flex items-center justify-center">
            <img
              src="https://www.go.ooo/img/bg-img/Login.jpg"
              alt="Login Illustration"
              className="max-h-[68rem] w-auto rounded-xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur"
            />
          </div>

          <div className="flex space-x-2">
            <div className="h-2 w-8 bg-white rounded-full"></div>
            <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
              </div>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                {/* <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a> */}
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? "Signing in..." : "Sign in"}</span>
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500">
              © 2025 Sustainnovatechlabs All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
