import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slices/authSlice";
import type { LoginResponse } from "../types/auth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fakeLoginAPI(email, password);

    const allowedRoles = [
      "admin",
      "sales_manager",
      "operation_manager",
    ] as const;

    const { userName, role, idToken, refreshToken } = response;

    if (allowedRoles.includes(role)) {
      dispatch(
        setCredentials({
          userName: userName,
          role: role,
          idToken: idToken,
          refreshToken: refreshToken,
        })
      );

      localStorage.setItem("role", role);
      localStorage.setItem("api_endpoint", `/api/${role}`);

      console.log(role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "sales_manager") {
        navigate("/sales/dashboard");
      } else if (role === "operation_manager") {
        navigate("/operation-manager/dashboard");
      }
    } else {
      throw new Error("Invalid role from server");
    }
  };

  const fakeLoginAPI = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            userName: "user_name",
            role: email === "admin@gmail.com" ? "admin" : "operation_manager",
            idToken: "fake-token-123",
            refreshToken: password,
            email: email,
          }),
        1000
      )
    );
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
          <div className="bg-blue-500/30 p-6 rounded-lg backdrop-blur">
            <p className="text-white font-medium mb-2">
              "This CRM platform has transformed how we manage our client
              relationships."
            </p>
            <p className="text-blue-200">— Sarah Johnson, CEO</p>
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
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
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
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
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
                  {/* {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )} */}
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
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition"
            >
              <span>Sign in</span>
              {/* <ArrowRightIcon className="ml-2 h-4 w-4" /> */}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500">
              © 2025 Sri Bramha Industries. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
