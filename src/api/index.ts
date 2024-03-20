import axios, {CreateAxiosDefaults} from "axios";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {AuthResponse} from "../types/response/auth-response";
import {ApiConstants} from "./api-constants";

const api = axios.create({
    withCredentials: true,
    baseURL: ApiConstants.BASE_URL,
} as CreateAxiosDefaults);

api.interceptors.request.use((config) => {
    if (typeof localStorage !== "undefined") {
        config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN)}`;
    }
    return config;
});

api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(ApiConstants.AUTH_REFRESH, {withCredentials: true})
            localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, response.data.access_token);
            return api.request(originalRequest);
        } catch (e) {}
    }
    throw error;
});

export default api;