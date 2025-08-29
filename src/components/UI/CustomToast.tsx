import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { removeToast } from "../../app/slices/toastSlice";

const CustomToast = () => {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("CustomToast - Current toasts:", toasts);
    
    // Auto-remove toasts after 3 seconds, but handle them one by one
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        // Remove the oldest toast
        if (toasts.length > 0) {
          dispatch(removeToast(toasts[0].id));
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-[9999] max-w-sm">
      {toasts.slice(0, 3).map((toast, index) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg border-2 shadow-lg transform transition-all duration-300 ${
            toast.type === "warning"
              ? "bg-yellow-50 border-yellow-400 text-yellow-800"
              : toast.type === "success"
              ? "bg-green-50 border-green-400 text-green-800"
              : "bg-red-50 border-red-400 text-red-800"
          }`}
          style={{
            transform: `translateY(${index * 10}px)`,
            zIndex: 9999 - index
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                {toast.type === "warning" ? "⚠️" : toast.type === "success" ? "✅" : "❌"}
              </span>
              <span className="font-medium text-sm">{toast.message}</span>
            </div>
            <button
              onClick={() => dispatch(removeToast(toast.id))}
              className="ml-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomToast;
