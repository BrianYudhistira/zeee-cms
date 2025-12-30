export interface AuthProps{
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export interface LoginFormData{
    email: string;
    password: string;
}