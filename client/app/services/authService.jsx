import api from "../lib/api";

export const login = async (credentials) => {
    const response = await api.post(
        '/api/v1/auth/login',
        credentials
    );

    return response.data;
}