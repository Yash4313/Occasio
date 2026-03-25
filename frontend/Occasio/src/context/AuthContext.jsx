import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import UiContext from "./UiContext";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const ui = useContext(UiContext);
  const refreshTimeoutRef = useRef(null);

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [access, setAccess] = useState(() => localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh") || null);

  // ========================
  // Helpers
  // ========================

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const isTokenNearExpiry = (token) => {
    const payload = decodeToken(token);
    if (!payload?.exp) return false;

    const now = Date.now() / 1000;
    return payload.exp - now < 60; // less than 1 min
  };

  // ========================
  // Auth Set / Clear
  // ========================

  const setAuth = (data) => {
    if (data?.access) {
      localStorage.setItem("access", data.access);
      setAccess(data.access);
      scheduleRefreshFromAccess(data.access);
    }

    if (data?.refresh) {
      localStorage.setItem("refresh", data.refresh);
      setRefresh(data.refresh);
    }

    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setAccess(null);
    setRefresh(null);
    setUser(null);

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  };

  // ========================
  // Login / Register
  // ========================

  const login = async ({ username, password }) => {
    const { showLoading, hideLoading, addToast } = ui;
    try {
      showLoading();
      const res = await api.post("auth/login/", { username, password });
      setAuth(res.data);
      addToast("Logged in", "success");
      return res.data;
    } catch (e) {
      addToast("Login failed", "danger");
      throw e;
    } finally {
      hideLoading();
    }
  };

  const register = async ({ username, email, password, password2, phone, role }) => {
    const { showLoading, hideLoading, addToast } = ui;

    const payload = { username, email, password };
    if (password2) payload.password2 = password2;
    if (phone) payload.phone = phone;
    if (role) payload.role = role;

    try {
      showLoading();
      const res = await api.post("auth/register/", payload);
      setAuth(res.data);
      addToast("Account created", "success");
      return res.data;
    } catch (e) {
      addToast("Registration failed", "danger");
      throw e;
    } finally {
      hideLoading();
    }
  };

  // ========================
  // Logout
  // ========================

  const logout = async () => {
    const { showLoading, hideLoading, addToast } = ui;

    try {
      showLoading();

      const token = refresh || localStorage.getItem("refresh");

      if (token) {
        try {
          await api.post("auth/logout/", { refresh: token });
        } catch (e) {
          console.warn("Logout API error (ignored)", e);
        }
      }

      addToast("Logged out", "info");
    } finally {
      hideLoading();
      clearAuth();
      navigate("/");
    }
  };

  // ========================
  // Refresh Token
  // ========================

  const refreshAccess = async () => {
    const token = refresh || localStorage.getItem("refresh");
    if (!token) return null;

    try {
      const res = await api.post("auth/token/refresh/", { refresh: token });

      if (res?.data?.access) {
        setAuth({ access: res.data.access });
        return res.data.access;
      }
    } catch (e) {
      console.warn("Refresh failed", e);

      // Only logout if refresh token invalid
      if (e?.response?.status === 401) {
        clearAuth();
        ui.addToast("Session expired", "warning");
      }

      return null;
    }
  };

  // ========================
  // Schedule Refresh
  // ========================

  const scheduleRefreshFromAccess = (accessToken) => {
    if (!accessToken) return;

    const payload = decodeToken(accessToken);
    if (!payload?.exp) return;

    const now = Date.now() / 1000;
    const secsUntilExp = payload.exp - now;

    if (secsUntilExp <= 0) return;

    let scheduleIn = (secsUntilExp - 30) * 1000;
    if (scheduleIn <= 0) scheduleIn = 5000;

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    refreshTimeoutRef.current = setTimeout(async () => {
      await refreshAccess();
    }, scheduleIn);
  };

  // ========================
  // On Focus Refresh (SAFE)
  // ========================

  useEffect(() => {
    const onFocus = () => {
      if (refresh && access && isTokenNearExpiry(access)) {
        refreshAccess();
      }
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh, access]);

  // ========================
  // Context Value
  // ========================

  const value = {
    user,
    access,
    refresh,
    isAuthenticated: !!access,
    login,
    register,
    logout,
    setAuth,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;