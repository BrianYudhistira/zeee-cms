import axios from "axios";
import { envConfig } from "@/config/env.config";

const apiClient = axios.create({
    baseURL: envConfig.BASE_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // If receiving a 401 on authenticated API endpoints (not initial login or csrf requests)
            const requestUrl = error.config?.url || "";
            const isGuestEndpoint = requestUrl.includes("/login") || requestUrl.includes("/csrf-cookie");

            if (!isGuestEndpoint && typeof window !== "undefined") {
                // Clear the frontend auth cookie
                document.cookie = "is_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
