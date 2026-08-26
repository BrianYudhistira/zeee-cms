"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

    const { register, isLoading, error, setError, validationErrors } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password dan Konfirmasi Password tidak cocok.");
            return;
        }

        if (!agreeTerms) {
            setError("Anda harus menyetujui syarat dan ketentuan.");
            return;
        }

        try {
            await register({
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });
        } catch (err) {
            console.error("[RegisterForm] Submit error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Name Input */}
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 md:mb-2"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    disabled={isLoading}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-zinc-300 dark:border-zinc-600 
                    bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors"
                />
                {validationErrors?.name && (
                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                        {validationErrors.name[0]}
                    </p>
                )}
            </div>

            {/* Email Input */}
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
                    onChange={(e) => setEmail(e.target.value)}
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

            {/* Password Input */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 md:mb-2"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    disabled={isLoading}
                    onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirm Password Input */}
            <div>
                <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 md:mb-2"
                >
                    Confirm Password
                </label>
                <input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    disabled={isLoading}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-zinc-300 dark:border-zinc-600 
                    bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors"
                />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
                <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    disabled={isLoading}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 rounded border-zinc-300 dark:border-zinc-600 
                    text-blue-600 bg-white dark:bg-zinc-700 cursor-pointer"
                />
                <label
                    htmlFor="terms"
                    className="ml-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer"
                >
                    I agree to the terms and conditions
                </label>
            </div>

            {/* Submit Button */}
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
                {isLoading ? "Creating Account..." : "Create Account"}
            </button>
        </form>
    );
}