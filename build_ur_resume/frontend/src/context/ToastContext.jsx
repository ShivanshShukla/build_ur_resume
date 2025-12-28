import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

const Toast = ({ id, message, type, onClose }) => {
    const bgStyles = {
        success: "bg-white border-green-200 dark:bg-stone-800 dark:border-green-900",
        error: "bg-white border-red-200 dark:bg-stone-800 dark:border-red-900",
        info: "bg-white border-blue-200 dark:bg-stone-800 dark:border-blue-900",
    };

    const iconStyles = {
        success: "text-green-500",
        error: "text-red-500",
        info: "text-blue-500",
    };

    const icons = {
        success: "check_circle",
        error: "error",
        info: "info",
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border p-4 shadow-lg ${bgStyles[type] || bgStyles.info}`}
            role="alert"
        >
            <span className={`material-symbols-outlined text-xl ${iconStyles[type] || iconStyles.info}`}>
                {icons[type] || icons.info}
            </span>
            <p className="flex-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                {message}
            </p>
            <button
                onClick={() => onClose(id)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
            >
                <span className="material-symbols-outlined text-lg">close</span>
            </button>
        </motion.div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info") => {
        const id = Date.now().toString() + Math.random().toString();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const toast = {
        success: (msg) => addToast(msg, "success"),
        error: (msg) => addToast(msg, "error"),
        info: (msg) => addToast(msg, "info"),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {createPortal(
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4">
                    <AnimatePresence mode="popLayout">
                        {toasts.map((t) => (
                            <Toast key={t.id} {...t} onClose={removeToast} />
                        ))}
                    </AnimatePresence>
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};
