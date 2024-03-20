import {IUser} from "../IUser";

export type AuthResponse = IUser & {
    access_token: string;
    refresh_token: string;
};