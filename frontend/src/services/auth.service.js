import api from "./api"

export const register = (data) => {
    return api.post('/auth/register', data)
}