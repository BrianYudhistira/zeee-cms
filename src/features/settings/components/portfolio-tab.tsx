"use client";

import { useState } from "react";
import { Globe, ExternalLink, Check } from "lucide-react";
import { SettingCard } from "./setting-card";
import { ToggleRow } from "./toggle-row";

export function PortfolioTab() {
	const [publicProfile, setPublicProfile] = useState(true);
	const [showEmail, setShowEmail] = useState(false);
	const [showSocial, setShowSocial] = useState(true);

	return (
		<div className="space-y-5">
			<SettingCard title="Profile Visibility" description="Control what is visible on your public portfolio page">
				<div className="-mt-2">
					<ToggleRow
						label="Public Profile"
						description="Portfolio is accessible to anyone via direct link"
						enabled={publicProfile}
						onToggle={() => setPublicProfile(!publicProfile)}
					/>
					<ToggleRow
						label="Show Email"
						description="Display email address on the portfolio contact section"
						enabled={showEmail}
						onToggle={() => setShowEmail(!showEmail)}
					/>
					<ToggleRow
						label="Show Social Media"
						description="Display LinkedIn, GitHub, and Instagram links"
						enabled={showSocial}
						onToggle={() => setShowSocial(!showSocial)}
					/>
				</div>
			</SettingCard>

			<SettingCard title="Portfolio URL" description="Public link to your portfolio page">
				<div className="flex items-center gap-3">
					<div
						className="flex-1 flex items-center gap-3 rounded-xl px-4 py-2.5"
						style={{ background: "var(--thead-bg)", border: "1px solid var(--border)" }}
					>
						<Globe className="h-4 w-4 flex-shrink-0" style={{ color: "var(--text-secondary)" } as React.CSSProperties} />
						<span className="text-sm" style={{ color: "var(--text-secondary)" }}>
							zeeeHub.com/
						</span>
						<span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
							brianyudhistira
						</span>
					</div>
					<button
						type="button"
						className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
						style={{ background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }}
					>
						<ExternalLink className="h-4 w-4" />
						Open
					</button>
				</div>
			</SettingCard>

			<SettingCard title="Displayed Sections" description="Choose which sections appear on your portfolio">
				<div className="space-y-2">
					{[
						{ label: "About Me", enabled: true },
						{ label: "Work Experience", enabled: true },
						{ label: "Education", enabled: true },
						{ label: "Skills & Technologies", enabled: true },
						{ label: "Projects", enabled: false },
						{ label: "Certifications", enabled: false },
					].map((section) => (
						<div
							key={section.label}
							className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors duration-200"
							style={{ background: "var(--thead-bg)", border: "1px solid var(--border)" }}
						>
							<span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
								{section.label}
							</span>
							<div
								className="h-5 w-5 rounded-md flex items-center justify-center transition-colors duration-200"
								style={{
									background: section.enabled ? "var(--nav-active-bg)" : "transparent",
									border: section.enabled ? "none" : "1px solid var(--border)",
								}}
							>
								{section.enabled && (
									<Check className="h-3 w-3" style={{ color: "var(--nav-active-text)" } as React.CSSProperties} />
								)}
							</div>
						</div>
					))}
				</div>
			</SettingCard>
		</div>
	);
}
