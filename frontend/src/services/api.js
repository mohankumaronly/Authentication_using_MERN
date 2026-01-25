import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || "";

    // 🔴 Rate limit
    if (status === 429) {
      alert(
        error.response?.data?.message ||
        "Too many attempts. Please wait a few minutes."
      );
      return Promise.reject(error);
    }

    // ❌ Ignore auth routes (CRITICAL)
    if (
      status === 401 &&
      (
        url.includes("/auth/login") ||
        url.includes("/auth/me") ||
        url.includes("/auth/refresh-token")
      )
    ) {
      return Promise.reject(error);
    }

    // ❌ Not an auth error
    if (status !== 401) {
      return Promise.reject(error);
    }

    // ❌ Prevent infinite retry
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🔁 If refresh already in progress, queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // 🔥 Silent refresh
      await api.post("/auth/refresh-token");

      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
