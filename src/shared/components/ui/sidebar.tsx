"use client";

import Image from "next/image";
import { useState } from "react";
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
import { PiMoneyWavy  } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 min-h-screen w-60 border-r border-black/10 bg-white dark:border-white/10 dark:bg-gray-800 flex flex-col">
      {/* ===== Brand ===== */}
      <div className="flex items-center gap-3 p-4">
        <Image src="/images/web_icon.png" alt="Logo" width={36} height={36} />
        <span className="text-xl font-bold dark:text-gray-100">ZeeeHub</span>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex flex-col gap-1 px-3 mt-2">
        <SidebarItem icon={<VscHome/>} label="Beranda" href="/dashboard" />
        <SidebarItem icon={<VscBriefcase/>} label="Portfolio" href="/dashboard/portfolio" />
        <SidebarItem icon={<PiMoneyWavy/>} label="Keuangan" href="/dashboard/keuangan" />

        <div className="my-2 border-t border-black/10" />

        <SidebarItem icon={<VscSettingsGear />} label="Pengaturan" href="/dashboard/pengaturan" />
      </nav>

      {/* ===== User Section ===== */}
      <div className="relative mt-auto p-3">
        {/* Profile Card */}
        <div
          onClick={() => router.push("/profil")}
          className="flex items-center justify-between rounded-lg p-2 cursor-pointer hover:bg-black/5 transition"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
              N
            </div>
            <div className="text-sm leading-tight">
              <p className="font-medium dark:text-white">Nama User</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">Portfolio aktif</p>
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
              onClick={() => console.log("logout")}
            />
          </div>
        )}
      </div>
    </aside>
  );
}