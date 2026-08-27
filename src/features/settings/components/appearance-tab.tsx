"use client";

import { Check } from "lucide-react";
import { useSidebarThemeStore } from "@/shared/store/sidebar-theme.store";
import { THEME_CARDS } from "../constants/settings.constants";
import { SettingCard } from "./setting-card";
import { SettingRow } from "./setting-row";

export function AppearanceTab() {
	const { sidebarTheme, setSidebarTheme, fontSize, setFontSize, iconSize, setIconSize } = useSidebarThemeStore();

	return (
		<div className="space-y-5">
			<SettingRow label="Font Size" description="Customize interface typography size">
				<div className="flex gap-3">
					<select
						value={fontSize}
						onChange={(event) => setFontSize(event.target.value as "sm" | "md" | "lg")}
						className="rounded-lg p-2 text-sm font-medium outline-none"
						style={{
							backgroundColor: "var(--input-bg)",
							border: "1px solid var(--input-border)",
							color: "var(--text-primary)",
						}}
					>
						{(["sm", "md", "lg"] as const).map((size) => {
							const labels = { sm: "Small", md: "Medium", lg: "Large" };
							return (
								<option key={size} value={size}>
									{labels[size]}
								</option>
							);
						})}
					</select>
				</div>
			</SettingRow>
			
			<SettingRow label="Icon Size" description="Adjust the size of icons in the interface">
				<div className="flex gap-3">
					<select
						value={iconSize}
						onChange={(event) => setIconSize(event.target.value as "sm" | "md" | "lg")}
						className="rounded-lg p-2 text-sm font-medium outline-none"
						style={{
							backgroundColor: "var(--input-bg)",
							border: "1px solid var(--input-border)",
							color: "var(--text-primary)",
						}}
					>
						{(["sm", "md", "lg"] as const).map((size) => {
							const labels = { sm: "Small", md: "Medium", lg: "Large" };
							return (
								<option key={size} value={size}>
									{labels[size]}
								</option>
							);
						})}
					</select>
				</div>
			</SettingRow>
			
			{/* Theme Selector */}
			<SettingCard title="Theme" description="Choose a visual style that suits your preference">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{THEME_CARDS.map((card) => {
						const isSelected = sidebarTheme === card.theme;
						return (
							<button
								key={card.theme}
								type="button"
								onClick={() => setSidebarTheme(card.theme)}
								className={`relative cursor-pointer text-left rounded-2xl overflow-hidden transition-all duration-300 group ${isSelected ? "ring-2 scale-[1.02]" : "hover:scale-[1.01]"
									}`}
								style={{
									border: isSelected ? "2px solid var(--nav-active-bg)" : "1px solid var(--border)",
									outline: isSelected ? "2px solid var(--nav-active-text-color, #2e579a)" : "none",
								}}
								aria-label={`Theme ${card.label}`}
							>
								{/* Preview Mockup */}
								<div className="h-32 flex overflow-hidden rounded-t-xl" style={{ background: card.contentBg }}>
									{/* Mini Sidebar */}
									<div
										className="w-12 h-full flex flex-col gap-1 p-1.5"
										style={{ background: card.sidebarBg, borderRight: "1px solid rgba(128,128,128,0.15)" }}
									>
										{/* Logo dot */}
										<div className="h-3 w-3 rounded-full mb-1" style={{ background: card.text, opacity: 0.5 }} />
										{/* Active nav item */}
										<div className="h-2 w-full rounded-md" style={{ background: card.activeItem }} />
										{/* Inactive items */}
										<div className="h-1.5 w-4/5 rounded" style={{ background: card.text, opacity: 0.2 }} />
										<div className="h-1.5 w-3/4 rounded" style={{ background: card.text, opacity: 0.2 }} />
										<div className="h-1.5 w-4/5 rounded" style={{ background: card.text, opacity: 0.15 }} />
									</div>
									{/* Mini Content */}
									<div className="flex-1 p-2 flex flex-col gap-1.5">
										<div className="h-2 w-20 rounded" style={{ background: card.text, opacity: 0.4 }} />
										<div
											className="h-10 w-full rounded-lg"
											style={{ background: card.sidebarBg, border: "1px solid rgba(128,128,128,0.12)" }}
										/>
										<div className="h-1 w-full rounded" style={{ background: card.subText, opacity: 0.3 }} />
										<div className="h-1 w-3/4 rounded" style={{ background: card.subText, opacity: 0.2 }} />
									</div>
								</div>

								{/* Label */}
								<div
									className="px-3 py-2.5 flex items-center justify-between"
									style={{ background: "var(--surface)" }}
								>
									<div>
										<p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
											{card.label}
										</p>
										<p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
											{card.description}
										</p>
									</div>
									<div
										className={`h-5 w-5 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-75"
											}`}
										style={{ background: "var(--nav-active-bg)" }}
									>
										<Check className="h-3 w-3" style={{ color: "var(--nav-active-text)" } as React.CSSProperties} />
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</SettingCard>

			{/* Font Size */}
			{/* <SettingCard title="Font Size" description="Customize interface typography size">
				<div className="flex gap-3">
					{(["sm", "md", "lg"] as const).map((size) => {
						const labels = { sm: "Small", md: "Medium", lg: "Large" };
						const isSelected = fontSize === size;
						return (
							<button
								key={size}
								type="button"
								onClick={() => setFontSize(size)}
								className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isSelected ? "scale-[1.02]" : ""
									}`}
								style={{
									background: isSelected ? "var(--nav-active-bg)" : "var(--thead-bg)",
									color: isSelected ? "var(--nav-active-text)" : "var(--text-secondary)",
									border: `1px solid ${isSelected ? "var(--nav-active-bg)" : "var(--border)"}`,
								}}
							>
								{labels[size]}
							</button>
						);
					})}
				</div>
			</SettingCard> */}
		</div>
	);
}
