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
    } catch (e) {
      return null;
    }
  });
  const [access, setAccess] = useState(() => localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh") || null);

  useEffect(() => {
    // keep axios interceptor headers in sync (api already sets Authorization from localStorage on each request,
    // but keeping in-memory state for quick checks)
  }, [access]);

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
    // clear scheduled refresh if any
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  };

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
    // include confirm password if provided (backend expects `password2`)
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

  const logout = async () => {
    const { showLoading, hideLoading, addToast } = ui;
    try {
      showLoading();

      // Try to refresh access first so the logout call has a valid Authorization header.
      // If refresh fails, we still want to clear local state (user may already be expired) and not surface an error.
      try {
        await refreshAccess();
      } catch (e) {
        // ignore refresh errors here
        console.warn("Refresh before logout failed", e);
      }

      const token = refresh || localStorage.getItem("refresh");
      if (token) {
        try {
          await api.post("auth/logout/", { refresh: token });
        } catch (e) {
          // backend logout failed (token invalid/expired) — treat as success from client perspective
          console.warn("Logout endpoint error (ignored):", e?.response?.data || e.message || e);
        }
      }

      addToast("Logged out", "info");
    } finally {
      hideLoading();
      clearAuth();
      navigate("/");
    }
  };

  // Refresh access token using refresh token
  const refreshAccess = async () => {
    const { showLoading, hideLoading, addToast } = ui;
    const token = refresh || localStorage.getItem("refresh");
    if (!token) return null;
    try {
      showLoading();
      const res = await api.post("auth/token/refresh/", { refresh: token });
      if (res?.data?.access) {
        setAuth({ access: res.data.access });
        return res.data.access;
      }
    } catch (e) {
      // refresh failed, clear auth
      clearAuth();
      addToast("Session expired", "warning");
      return null;
    } finally {
      hideLoading();
    }
  };

  // Schedule refresh according to access token expiry (expires slightly before actual expiry)
  const scheduleRefreshFromAccess = (accessToken) => {
    if (!accessToken) return;
    try {
      // decode payload (base64) to read exp
      const parts = accessToken.split('.');
      if (parts.length < 2) return;
      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp; // seconds since epoch
      if (!exp) return;

      const nowSec = Math.floor(Date.now() / 1000);
      // schedule 30 seconds before expiry (or half of remaining time if short)
      const secsUntilExp = exp - nowSec;
      let scheduleIn = (secsUntilExp - 30) * 1000;
      if (scheduleIn <= 0) scheduleIn = Math.max(5000, (secsUntilExp * 500));

      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = setTimeout(async () => {
        try {
          await refreshAccess();
        } catch (e) {
          console.warn('scheduled refresh failed', e);
        }
      }, scheduleIn);
    } catch (e) {
      console.warn('scheduleRefreshFromAccess error', e);
    }
  };

  // periodically refresh access token (every 10 minutes) and when window gains focus
  useEffect(() => {
    const interval = setInterval(() => {
      if (refresh) refreshAccess();
    }, 1000 * 60 * 10);

    const onFocus = () => {
      if (refresh) refreshAccess();
    };

    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

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
