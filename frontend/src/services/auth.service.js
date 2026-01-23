import api from "./api"

export const register = (data) => {
    return api.post('/auth/register', data)
}

export const verifyEmail = (token) => {
    return api.post(`/auth/verify-email/${token}`);
}