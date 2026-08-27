import { User, Palette, Shield, Briefcase } from "lucide-react";
import { SettingsTabItem, ThemeCardItem } from "../types/settings.types";

export const SETTINGS_TABS: SettingsTabItem[] = [
	{ id: "account", label: "Account", icon: User },
	{ id: "security", label: "Security", icon: Shield },
	{ id: "appearance", label: "Appearance", icon: Palette },
	{ id: "portfolio", label: "Portfolio", icon: Briefcase },
];

export const THEME_CARDS: ThemeCardItem[] = [
	{
		theme: "light",
		label: "Light",
		description: "Clean & bright",
		sidebarBg: "#ffffff",
		contentBg: "#f0f2f7",
		activeItem: "#111827",
		text: "#374151",
		subText: "#9ca3af",
	},
	{
		theme: "blue",
		label: "Blue",
		description: "Elegant blue accent",
		sidebarBg: "#ffffff",
		contentBg: "#eef1f7",
		activeItem: "rgba(46,87,154,0.12)",
		text: "#374151",
		subText: "#9ca3af",
	},
	{
		theme: "dark",
		label: "Dark",
		description: "Dark & modern",
		sidebarBg: "#1e293b",
		contentBg: "#0f172a",
		activeItem: "rgba(255,255,255,0.12)",
		text: "#94a3b8",
		subText: "#64748b",
	},
];
