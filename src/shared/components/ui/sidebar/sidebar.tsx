"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SidebarItem from "./sidebarItem.comp";
import DropdownItem from "./Dropdown.comp";
import {
	BriefcaseBusiness,
	Ellipsis,
	House,
	LogOut,
	Settings,
	UserRound,
	WalletCards,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSidebarThemeStore } from "@/shared/store/sidebar-theme.store";

export default function Sidebar() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const user = useAuthStore((state) => state.user);
	const isLoading = useAuthStore((state) => state.isLoading);
	const { logout } = useAuth();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const iconSize = useSidebarThemeStore((s) => s.iconSize);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<aside
			className="sidebar-transition hidden fixed left-0 top-0 min-h-screen w-60 md:flex flex-col transition-all duration-300"
			data-icon-size={iconSize}
			style={{
				backgroundColor: "var(--sidebar-bg)",
				borderRight: "1px solid var(--sidebar-border)",
			}}
		>
			{/* ===== Logo ===== */}
			<div className="flex items-center justify-start gap-2 px-4 py-5">
				<Image src="/images/web_icon.png" alt="Logo" width={32} height={32} />
				<a
					href="#"
					className="text-lg font-bold tracking-tight transition-colors duration-300"
					style={{ color: "var(--text-primary)" }}
				>
					ZeeeHub
				</a>
			</div>

			{/* ===== Navigation ===== */}
			<nav className="flex flex-col gap-0.5 px-3 mt-1">
				<SidebarItem icon={<House size={20} />} label="Dashboard" href="/dashboard" />
				<SidebarItem
					icon={<BriefcaseBusiness size={20} />}
					label="Portfolio"
					subItems={[
						{ label: "Home", href: "/dashboard/portfolio" },
						{ label: "Skill & Education", href: "#" },
					]}
				/>
				<SidebarItem icon={<WalletCards size={20} />} label="Business" href="/dashboard/business" />

				<div className="my-2" style={{ borderTop: "1px solid var(--divider)" }} />

				<SidebarItem icon={<Settings size={20} />} label="Settings" href="/dashboard/settings" />
			</nav>


			{/* ===== User Section ===== */}
			<div className="relative mt-auto p-3" ref={dropdownRef}>
				{/* Profile Card */}
				<div
					onClick={() => router.push("#")}
					className="flex items-center justify-between rounded-xl p-2 cursor-pointer transition-colors duration-200"
					style={{ ["--hover-bg" as string]: "var(--user-hover-bg)" }}
					onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--user-hover-bg)")}
					onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
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
							<div
								className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold"
								style={{ backgroundColor: "var(--nav-active-bg)", color: "var(--nav-active-text)" }}
							>
								{isLoading ? "..." : user?.name?.[0]?.toUpperCase() || "U"}
							</div>
						)}
						<div className="text-sm leading-tight">
							<p className="font-semibold" style={{ color: "var(--text-primary)" }}>
								{isLoading ? "Loading..." : user?.name || "Nama User"}
							</p>
							<p className="text-xs" style={{ color: "var(--text-secondary)" }}>
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
						className="p-1 rounded-lg transition-colors duration-200"
						onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--user-hover-bg)")}
						onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
					>
						<Ellipsis className="h-5 w-5" style={{ color: "var(--text-secondary)" } as React.CSSProperties} />
					</button>
				</div>

				{/* Dropdown */}
				{open && (
					<div
						className="absolute bottom-17 left-3 right-3 rounded-xl overflow-hidden shadow-lg"
						style={{
							backgroundColor: "var(--dropdown-bg)",
							border: "1px solid var(--dropdown-border)",
						}}
					>
						<DropdownItem
							icon={<UserRound />}
							label="Profil"
							onClick={() => router.push("/profil")}
						/>
						<DropdownItem
							icon={<LogOut />}
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
