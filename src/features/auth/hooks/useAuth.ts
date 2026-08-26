import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";
import { LoginFormData, RegisterFormData, ValidationErrors } from "../types/auth";

export function useAuth() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

    const user = useAuthStore((state) => state.user);
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const isStoreLoading = useAuthStore((state) => state.isLoading);
    const setUser = useAuthStore((state) => state.setUser);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const fetchUser = useAuthStore((state) => state.fetchUser);

    const handleAuthError = (err: unknown) => {
        let message = "Terjadi kesalahan saat memproses permintaan.";
        setValidationErrors(null);

        if (axios.isAxiosError(err)) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setValidationErrors(err.response.data.errors);
                message = err.response.data.message || "Data yang dimasukkan tidak valid.";
            } else if (err.response?.data?.message) {
                message = err.response.data.message;
            } else if (err.message) {
                message = err.message;
            }
        } else if (err instanceof Error) {
            message = err.message;
        }

        setError(message);
    };

    const login = useCallback(async (emailOrPayload: string | LoginFormData, maybePassword?: string) => {
        setIsLoading(true);
        setError(null);
        setValidationErrors(null);

        const payload: LoginFormData = typeof emailOrPayload === "string"
            ? { email: emailOrPayload, password: maybePassword || "" }
            : emailOrPayload;

        try {
            const userData = await authService.login(payload);
            setUser(userData);
            router.push("/dashboard");
            return userData;
        } catch (err) {
            handleAuthError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router, setUser]);

    const loginRemembered = useCallback(async (email: string, password: string) => {
        return login({ email, password, remember: true });
    }, [login]);

    const register = useCallback(async (payload: RegisterFormData) => {
        setIsLoading(true);
        setError(null);
        setValidationErrors(null);

        try {
            const userData = await authService.register(payload);
            setUser(userData);
            router.push("/dashboard");
            return userData;
        } catch (err) {
            handleAuthError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router, setUser]);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await authService.logout();
        } catch (err) {
            console.warn("[useAuth] Logout API call failed, clearing local state anyway", err);
        } finally {
            clearAuth();
            setIsLoading(false);
            router.replace("/login");
        }
    }, [clearAuth, router]);

    const checkAuth = useCallback(async () => {
        return fetchUser();
    }, [fetchUser]);

    return {
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isFetchingUser: isStoreLoading,
        isInitialized,
        error,
        setError,
        validationErrors,
        login,
        loginRemembered,
        register,
        logout,
        checkAuth,
    };
}