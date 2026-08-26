import apiClient from "@/shared/utils/apiClient";
import { IUser, LoginFormData, RegisterFormData, AuthResponse } from "../types/auth";

export const authService = {

    async csrfCookie(): Promise<void> {
        await apiClient.get("/sanctum/csrf-cookie");
    },

    async login(payload: LoginFormData): Promise<IUser> {
        await this.csrfCookie();

        const endpoint = payload.remember ? "/api/login-remember" : "/api/login";
        const response = await apiClient.post<AuthResponse>(endpoint, {
            email: payload.email,
            password: payload.password,
        });

        const userData = response.data.user || response.data.data || (response.data as unknown as IUser);
        return userData;
    },

    /**
     * Registers a new user account.
     */
    async register(payload: RegisterFormData): Promise<IUser> {
        await this.csrfCookie();

        const response = await apiClient.post<AuthResponse>("/api/register", payload);
        const userData = response.data.user || response.data.data || (response.data as unknown as IUser);
        return userData;
    },

    /**
     * Logs out the currently authenticated user.
     */
    async logout(): Promise<void> {
        await apiClient.post("/api/logout");
    },

    /**
     * Retrieves the currently authenticated user profile.
     */
    async getUser(): Promise<IUser> {
        const response = await apiClient.get<AuthResponse>("/api/user");
        const userData = response.data.user || response.data.data || (response.data as unknown as IUser);
        return userData;
    },
};
