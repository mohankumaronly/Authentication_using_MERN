import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  // baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      const message =
        error.response.data?.message ||
        'Too many attempts. Please wait a few minutes before trying again.';

      alert(message);
    }
    return Promise.reject(error);
  }
);

export default api;
