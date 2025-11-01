
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", 
});

//Attach JWT token automatically (if stored in localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to try refreshing access token on 401 once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          // Use axios directly to avoid interceptor loop
          const refreshUrl = api.defaults.baseURL + "auth/token/refresh/";
          const r = await axios.post(refreshUrl, { refresh });
          if (r?.data?.access) {
            localStorage.setItem("access", r.data.access);
            // update header and retry original request
            originalRequest.headers.Authorization = `Bearer ${r.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // refresh failed, clear tokens
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

