import api from "./api"

export const userRegister = async (data) => {
    return await api.post('/auth/register', data)
}