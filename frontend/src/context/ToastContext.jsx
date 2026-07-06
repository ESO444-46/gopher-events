import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/ToastNotification";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={clearToast} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
