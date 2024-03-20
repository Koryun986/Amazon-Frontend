import api from "../index";
import {AuthResponse} from "../../types/response/auth-response";
import {ApiConstants} from "../api-constants";

export async function getUser() {
    return await api.get<AuthResponse>(ApiConstants.AUTH_GET_USER, {withCredentials: true});
}

export async function loginAccount(userData: {email: string, password: string}) {
    return await api.post<AuthResponse>(ApiConstants.AUTH_LOGIN, userData, {withCredentials: true});
}

export async function registerAccount(userData: {first_name: string, last_name: string, email: string, password: string}) {
    return await api.post<AuthResponse>(ApiConstants.AUTH_REGISTRATION, userData, {withCredentials: true});

}