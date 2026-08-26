"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { VscChevronDown, VscChevronRight, VscChevronUp } from "react-icons/vsc";

export interface SidebarSubItem {
  label: string;
  href: string;
}

export default function SidebarItem({
  icon,
  label,
  href,
  subItems,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  subItems?: SidebarSubItem[];
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive =
    (href && pathname === href) ||
    subItems?.some((item) => pathname === item.href);

  if (subItems && subItems.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${isActive ? "bg-black/10 dark:bg-white/10" : ""
            } group flex w-full items-center justify-between rounded-lg py-2 px-3 transition hover:bg-black/20 dark:hover:bg-white/20`}
        >
          <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
            <span className="text-xl">{icon}</span>
            <span className="text-md font-medium">{label}</span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">
            <VscChevronDown
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                }`}
            />
          </span>
        </button>
        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 pl-11 pr-3 pb-1 pt-1">
              {subItems.map((item, index) => {
                const isSubActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`${isSubActive
                      ? "font-medium text-black dark:text-white"
                      : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                      } py-2.5 text-sm transition-colors`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`${isActive ? "bg-black/10 dark:bg-white/10" : ""
        } group rounded-lg py-2 px-3 transition hover:bg-black/20 dark:hover:bg-white/20`}
    >
      <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}