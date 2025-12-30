'use client';
import Sidebar from "@/shared/components/ui/sidebar";

export default function DashboardLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="flex flex-row gap-1">
      <Sidebar />
      <div className="ml-60 p-4">
        {children}
      </div>
    </div>
  );
}