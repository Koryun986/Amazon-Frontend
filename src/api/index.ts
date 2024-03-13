import axios, {CreateAxiosDefaults} from "axios";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {AuthResponse} from "../types/response/auth-response";

const API_URL = "http://localhost:5000";

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
} as CreateAxiosDefaults);

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN)}`;
    return config;
});

api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, response.data.access_token);
            return api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
});

export default api;