"use client";

import { useState } from "react";
import {
	SettingsTab,
	SETTINGS_TABS,
	AccountTab,
	AppearanceTab,
	SecurityTab,
	PortfolioTab,
} from "@/features/settings";

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState<SettingsTab>("account");

	return (
		<div className="settings-transition max-w-3xl">
			{/* ── Header ──────────────────────────────────────── */}
			<div className="mb-7">
				<h1
					className="text-2xl font-bold tracking-tight"
					style={{ color: "var(--text-primary)" }}
				>
					Settings
				</h1>
				<p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
					Manage your account settings, visual appearance, and preferences.
				</p>
			</div>

			{/* ── Tab Navigation ──────────────────────────────── */}
			<div
				className="flex gap-1 mb-7 p-1 rounded-xl"
				style={{ background: "var(--thead-bg)", border: "1px solid var(--border)" }}
			>
				{SETTINGS_TABS.map(({ id, label, icon: Icon }) => {
					const isActive = activeTab === id;
					return (
						<button
							key={id}
							type="button"
							onClick={() => setActiveTab(id)}
							className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
							style={{
								background: isActive ? "var(--nav-active-bg)" : "transparent",
								color: isActive ? "var(--nav-active-text)" : "var(--text-secondary)",
								boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
							}}
						>
							<Icon className="h-4 w-4 icon-size" />
							<span className="hidden sm:inline">{label}</span>
						</button>
					);
				})}
			</div>

			{/* ── Tab Content ─────────────────────────────────── */}
			<div className="transition-all duration-200">
				{activeTab === "account" && <AccountTab />}
				{activeTab === "appearance" && <AppearanceTab />}
				{activeTab === "security" && <SecurityTab />}
				{activeTab === "portfolio" && <PortfolioTab />}
			</div>
		</div>
	);
}
