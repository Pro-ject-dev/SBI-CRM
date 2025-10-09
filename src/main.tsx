import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { restoreCredentials, initializeAuth } from "./app/slices/authSlice";

// Initialize auth synchronously before first render
store.dispatch(restoreCredentials());
// Also mark as initialized to prevent loading state
store.dispatch(initializeAuth());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
