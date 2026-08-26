"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const errorQuery = searchParams.get("error");
    const { login, isLoading, error, setError, validationErrors } = useAuth();

    useEffect(() => {
        if (errorQuery) {
            setError(
                errorQuery === "not_authenticated"
                    ? "Sesi Anda telah berakhir atau belum login. Silakan login kembali."
                    : "Terjadi kesalahan saat mengautentikasi."
            );
        }
    }, [errorQuery, setError]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) setError(null);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({
                email,
                password,
                remember: rememberMe,
            });
        } catch (err) {
            console.error("[LoginForm] Submit error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 md:mb-2"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    disabled={isLoading}
                    onChange={handleEmailChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-zinc-300 dark:border-zinc-600 
                    bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors"
                />
                {validationErrors?.email && (
                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                        {validationErrors.email[0]}
                    </p>
                )}
            </div>

            <div>
                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Password
                    </label>
                    <a
                        href="#"
                        className="text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                        Forgot?
                    </a>
                </div>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    disabled={isLoading}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-zinc-300 dark:border-zinc-600 
                    bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors"
                />
                {validationErrors?.password && (
                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                        {validationErrors.password[0]}
                    </p>
                )}
            </div>

            <div className="flex items-center">
                <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    disabled={isLoading}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-zinc-300 dark:border-zinc-600 
                    text-blue-600 bg-white dark:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                />
                <label
                    htmlFor="remember"
                    className="ml-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer"
                >
                    Remember me for 30 days
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer bg-blue-800 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500
                  text-white font-semibold py-2.5 md:py-3 px-4 text-sm md:text-base rounded-lg
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Signing In...</span>
                    </>
                ) : (
                    "Sign In"
                )}
            </button>
        </form>
    );
}