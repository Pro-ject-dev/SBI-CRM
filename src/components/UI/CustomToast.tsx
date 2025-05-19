import WarningIcon from "@mui/icons-material/Error";
import ErrorIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { removeToast } from "../../app/slices/toastSlice";

const CustomToast = () => {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toasts[0].id));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-[9999]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            ...(toast.type === "warning"
              ? { ...styles.warn }
              : toast.type === "success"
              ? { ...styles.success }
              : { ...styles.error }),
            borderRadius: "10px",
            padding: "10px 20px",
            color: "black",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {toast.type === "warning" ? (
            <WarningIcon
              style={{
                ...styles.warn,
                marginRight: "8px",
                color: "#f1c40f",
                fontSize: "20px",
              }}
            />
          ) : toast.type === "success" ? (
            <CheckCircleIcon
              style={{
                ...styles.success,
                marginRight: "8px",
                color: "#27ae60",
                fontSize: "20px",
              }}
            />
          ) : (
            <ErrorIcon
              style={{
                ...styles.error,
                marginRight: "8px",
                color: "#e74c3c",
                fontSize: "20px",
              }}
            />
          )}

          {toast.message}
        </div>
      ))}
    </div>
  );
};

const styles = {
  warn: {
    backgroundColor: "#fef9e7",
    border: "1px solid #f1c40f",
  },
  error: {
    backgroundColor: "#fdedec",
    border: "1px solid #e74c3c",
  },
  success: {
    backgroundColor: "#e9f7ef",
    border: "1px solid #27ae60",
  },
};

export default CustomToast;
