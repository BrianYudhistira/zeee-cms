import React from "react";

export interface AuthProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export interface LoginFormData {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}

export interface IUser {
    id: number;
    name: string;
    username?: string;
    email: string;
    photo_path?: string | null;
    role?: string;
    created_at?: string;
    updated_at?: string;
}

export interface AuthResponse<T = IUser> {
    message?: string;
    user?: T;
    data?: T;
}

export type ValidationErrors = Record<string, string[]>;