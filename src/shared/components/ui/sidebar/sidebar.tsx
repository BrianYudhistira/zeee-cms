"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import SidebarItem from "./sidebarItem.comp";
import DropdownItem from "./Dropdown.comp";
import {
  VscHome,
  VscAccount,
  VscBriefcase,
  VscSettingsGear,
  VscEllipsis,
  VscSignOut,
} from "react-icons/vsc";
import { PiMoneyWavy } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Moon, Sun } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const { logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <aside className="hidden fixed left-0 top-0 min-h-screen w-60 border-r border-black/10 bg-white dark:border-white/10 dark:bg-gray-800 md:flex flex-col">
      {/* ===== Brand ===== */}
      <div className="flex items-center justify-start gap-1 p-4">
        <Image src="/images/web_icon.png" alt="Logo" width={36} height={36} />
        <a href="#" className="text-xl font-bold dark:text-gray-100">ZeeeHub</a>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex flex-col gap-1 px-3 mt-2">
        <SidebarItem icon={<VscHome />} label="Beranda" href="/dashboard" />
        <SidebarItem icon={<VscBriefcase />} label="Portfolio" subItems={[
          {
            label: "Home",
            href: "/dashboard/portfolio",
          },
          {
            label: "Skill & Education",
            href: "#",
          }
        ]} />
        <SidebarItem icon={<PiMoneyWavy />} label="Keuangan" href="/dashboard/keuangan" />

        <div className="my-2 border-t border-black/10 dark:border-white/20" />

        <SidebarItem icon={<VscSettingsGear />} label="Pengaturan" href="/dashboard/pengaturan" />
      </nav>

      {/* ===== Dark Mode Icon Toggle ===== */}
      <div className="px-3 mt-2 flex justify-start">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle dark mode"
          className="
            relative h-9 w-9
            rounded-full
            flex items-center justify-center
            bg-black/5 hover:bg-black/10
            dark:bg-white/5 dark:hover:bg-white/10
            transition-colors duration-300
            group
          "
        >
          <Sun
            className="
              absolute h-5 w-5
              text-yellow-400
              transition-all duration-300
              rotate-0 scale-100 opacity-100
              dark:rotate-90 dark:scale-0 dark:opacity-0
            "
          />

      {/* Moon */}
      <Moon
            className="
              absolute h-5 w-5
              text-indigo-400
              transition-all duration-300
              rotate-90 scale-0 opacity-0
              dark:rotate-0 dark:scale-100 dark:opacity-100
            "
          />
        </button>
      </div>

      {/* ===== User Section ===== */}
      <div className="relative mt-auto p-3" ref={dropdownRef}>
        {/* Profile Card */}
        <div
          onClick={() => router.push("#")}
          className="flex items-center justify-between rounded-lg p-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <div className="flex items-center gap-3">
            {user?.photo_path ? (
              <Image
                src={user.photo_path}
                alt={user.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                {isLoading ? "..." : (user?.name?.[0]?.toUpperCase() || "U")}
              </div>
            )}
            <div className="text-sm leading-tight">
              <p className="font-medium dark:text-white">
                {isLoading ? "Loading..." : (user?.name || "Nama User")}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {user?.role || "Portfolio aktif"}
              </p>
            </div>
          </div>

          {/* Ellipsis Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
          >
            <VscEllipsis className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute bottom-17 left-3 right-3 rounded-lg border border-black/10 bg-white dark:bg-gray-700 shadow-md overflow-hidden">
            <DropdownItem
              icon={<VscAccount />}
              label="Profil"
              onClick={() => router.push("/profil")}
            />
            <DropdownItem
              icon={<VscSignOut />}
              label="Logout"
              danger
              onClick={() => logout()}
            />
          </div>
        )}
      </div>
    </aside>
  );
}