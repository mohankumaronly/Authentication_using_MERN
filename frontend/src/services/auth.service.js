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