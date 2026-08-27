"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../store/auth.store";

interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const fetchUser = useAuthStore((state) => state.fetchUser);
    const router = useRouter();

    useEffect(() => {
        if (!isInitialized) {
            fetchUser();
        }
    }, [isInitialized, fetchUser]);

    useEffect(() => {
        if (isInitialized && !isLoading && !user) {
            router.replace("/login");
        }
    }, [isInitialized, isLoading, user, router]);

    if (!isInitialized || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] w-full">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
