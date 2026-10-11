import React, { createContext, useContext, useState } from 'react';
import { Compass } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    title: 'Notification',
    message: '',
  });

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Element */}
      <div
        id="toast"
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 bg-ink text-parchment px-5 py-3.5 border border-taupe/30 shadow-xl max-w-sm ${
          toast.visible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-24 pointer-events-none'
        }`}
      >
        <div className="text-terracotta shrink-0">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest font-medium">
            {toast.title}
          </div>
          <div className="text-xs text-taupe-light mt-0.5">{toast.message}</div>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
