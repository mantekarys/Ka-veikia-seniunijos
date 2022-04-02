import { apiClient } from "./axios"

export const login = async (body) => {
    try {
        const response = await apiClient.post('api/User/auth',body)
        return [response, null];

    } catch (error) {
        console.error(error.response)
        return [null, error.response.data.message];
    }
}