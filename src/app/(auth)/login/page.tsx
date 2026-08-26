import type { Metadata } from "next";
import LoginForm from "@/features/auth/components/login.form"
import AuthCard from "@/features/auth/components/auth.card"

export const metadata: Metadata = {
    title: "Login - Zeee CMS",
    description: "Sign in to your account",
};

export default function Login() {
    return (
        <AuthCard title="Welcome Back" subtitle="Sign in to your account">
            <LoginForm />
            <div className="relative my-5 md:my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-300 dark:border-zinc-600"></div>
                </div>
            </div>

            <p className="mt-5 md:mt-6 text-center text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                Don't have an account?{' '}
                <a
                    href="/register"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                    Sign up
                </a>
            </p>
        </AuthCard>
    )
}