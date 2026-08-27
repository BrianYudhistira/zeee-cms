"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

	// ── Inline style objects using CSS variables (set per theme in globals.css) ──
	const activeStyle: React.CSSProperties = {
		backgroundColor: "var(--nav-active-bg)",
		color: "var(--nav-active-text)",
	};

	const inactiveStyle: React.CSSProperties = {
		color: "var(--nav-inactive-text)",
	};

	const itemStyle = isActive ? activeStyle : inactiveStyle;

	if (subItems && subItems.length > 0) {
		return (
			<div className="flex flex-col gap-0.5">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="group flex w-full items-center justify-between rounded-xl py-2.5 px-3.5 font-semibold transition-colors duration-200"
					style={itemStyle}
					onMouseEnter={(e) => {
						if (!isActive) e.currentTarget.style.backgroundColor = "var(--nav-hover-bg)";
					}}
					onMouseLeave={(e) => {
						if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
					}}
				>
					<div className="flex items-center gap-3.5">
						<span className="icon-size size-5 flex-shrink-0" aria-hidden="true">
							{icon}
						</span>
						<span className="text-sm font-semibold leading-5">{label}</span>
					</div>
					<ChevronDown
						className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
						style={{ color: isActive ? "var(--nav-active-text)" : "var(--nav-chevron-inactive)" } as React.CSSProperties}
					/>
				</button>

				<div
					className={`grid transition-all duration-300 ease-in-out ${(isOpen || isActive) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
						}`}
				>
					<div className="overflow-hidden">
						<div className="flex flex-col gap-0.5 pl-[52px] pr-3 pb-1 pt-0.5">
							{subItems.map((item, index) => {
								const isSubActive = pathname === item.href;
								return (
									<Link
										key={index}
										href={item.href}
										className="py-2 text-sm font-medium transition-colors duration-200"
										style={{
											color: isSubActive
												? "var(--nav-sub-active-text)"
												: "var(--nav-sub-inactive-text)",
											fontWeight: isSubActive ? 600 : 500,
										}}
										onMouseEnter={(e) => {
											if (!isSubActive)
												(e.currentTarget as HTMLElement).style.color = "var(--nav-sub-hover-text)";
										}}
										onMouseLeave={(e) => {
											if (!isSubActive)
												(e.currentTarget as HTMLElement).style.color = "var(--nav-sub-inactive-text)";
										}}
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
			className="group flex items-center gap-3.5 rounded-xl py-2.5 px-3.5 font-semibold transition-colors duration-200"
			style={itemStyle}
			onMouseEnter={(e) => {
				if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--nav-hover-bg)";
			}}
			onMouseLeave={(e) => {
				if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
			}}
		>
			<span className="icon-size size-5 flex-shrink-0" aria-hidden="true">
				{icon}
			</span>
			<span className="text-sm font-semibold leading-5">{label}</span>
		</Link>
	);
}
