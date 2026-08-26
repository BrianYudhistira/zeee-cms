import Sidebar from "@/shared/components/ui/sidebar/sidebar";

import { AuthGuard } from "@/features/auth/components/auth-guard";

export default function DashboardLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <AuthGuard>
      <div className="flex flex-row gap-1">
        <Sidebar />
        <div className=" md:ml-60 p-8 w-full">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}