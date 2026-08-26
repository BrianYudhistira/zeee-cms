import { create } from "zustand";
import { IUser } from "../types/auth";
import { authService } from "../services/auth.service";

interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    isInitialized: boolean;
    isFetching: boolean;
    fetchUser: () => Promise<IUser | null>;
    setUser: (user: IUser | null) => void;
    clearAuth: () => void;
}

const syncAuthCookie = (isAuthenticated: boolean) => {
    if (typeof document !== "undefined") {
        if (isAuthenticated) {
            document.cookie = "is_logged_in=true; path=/; max-age=2592000; SameSite=Lax";
        } else {
            document.cookie = "is_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        }
    }
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    isInitialized: false,
    isFetching: false,

    fetchUser: async () => {
        if (get().isFetching) return get().user;

        try {
            set({ isLoading: true, isFetching: true });
            const user = await authService.getUser();
            
            syncAuthCookie(true);
            set({ user, isLoading: false, isInitialized: true, isFetching: false });
            return user;
        } catch (error) {
            console.warn("[AuthStore] User not authenticated or session expired", error);
            syncAuthCookie(false);
            set({ user: null, isLoading: false, isInitialized: true, isFetching: false });
            return null;
        }
    },

    setUser: (user) => {
        syncAuthCookie(Boolean(user));
        set({
            user,
            isInitialized: true,
            isLoading: false,
            isFetching: false,
        });
    },

    clearAuth: () => {
        syncAuthCookie(false);
        set({ user: null, isInitialized: true, isLoading: false, isFetching: false });
    },
}));
