import React, { createContext, useState, useCallback } from 'react';

export const UiContext = createContext(null);

export const UiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showLoading = useCallback(() => setLoading(true), []);
  const hideLoading = useCallback(() => setLoading(false), []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    // auto remove after 4s
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const value = {
    loading,
    showLoading,
    hideLoading,
    toasts,
    addToast,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export default UiContext;
