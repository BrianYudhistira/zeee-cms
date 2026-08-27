"use client";

import Sidebar from "@/shared/components/ui/sidebar/sidebar";
import { AuthGuard } from "@/features/auth/components/auth-guard";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <div className="flex flex-row">
        <Sidebar />
        <main
          className="md:ml-60 min-h-screen w-full p-8 transition-all duration-300"
          style={{ backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
        >
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
