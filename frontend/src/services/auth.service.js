import api from "./api"

export const register = (data) => {
  return api.post('/auth/register', data)
}

export const verifyEmail = (token) => {
  return api.get(`/auth/verify-email/${token}`);
}

export const login = (data) => {
  return api.post('/auth/login', data);
}

export const logout = () => {
  return api.post('/auth/logout');
}

export const getMe = () => {
  return api.get('/auth/me')
}

export const forgotPassword = (data) => {
  return api.post('/auth/forgot-password', data);
}

export const resetPassword = (token, data) => {
  return api.post(`/auth/reset-password/${token}`, data);
}

export const createPayment = (data) => {
  return api.post('/payment/intent', data)
}

export const submitPayment = (data) => {
  return api.post("/payment/verify", data);
};

// export const getAllPayments = () => {
//   return api.get('payment/admin/payments')
// }
export const approvePayment = (paymentId) => {
  return api.post(`/payment/admin/payments/${paymentId}/approve`);
};

export const rejectPayment = (paymentId) => {
  return api.post(`/payment/admin/payments/${paymentId}/reject`);
};

export const getAllPayments = (status) => {
  const query = status ? `?status=${status}` : "";
  return api.get(`/payment/admin/payments${query}`);
};

