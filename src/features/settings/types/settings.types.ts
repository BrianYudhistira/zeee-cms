import { SidebarTheme } from "@/shared/store/sidebar-theme.store";

export type SettingsTab = "account" | "appearance" | "security" | "portfolio";

export interface SettingsTabItem {
	id: SettingsTab;
	label: string;
	icon: React.ElementType;
}

export interface ThemeCardItem {
	theme: SidebarTheme;
	label: string;
	description: string;
	sidebarBg: string;
	contentBg: string;
	activeItem: string;
	text: string;
	subText: string;
}
