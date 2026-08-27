"use client";

import { useState } from "react";
import { Eye, EyeOff, Monitor, Smartphone } from "lucide-react";
import { SettingCard } from "./setting-card";
import { ToggleRow } from "./toggle-row";

export function SecurityTab() {
	const [showPassword, setShowPassword] = useState(false);
	const [twoFactor, setTwoFactor] = useState(false);
	const [loginAlert, setLoginAlert] = useState(true);
	const [sessionRemember, setSessionRemember] = useState(false);

	return (
		<div className="space-y-5">
			<SettingCard title="Password" description="Regularly update your password to stay secure">
				<div className="space-y-4">
					{["Current Password", "New Password", "Confirm Password"].map((label, i) => (
						<div key={i}>
							<label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>
								{label}
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									className="w-full rounded-xl px-4 py-2.5 text-sm pr-10 outline-none transition-colors duration-200"
									style={{
										background: "var(--input-bg)",
										border: "1px solid var(--input-border)",
										color: "var(--text-primary)",
									}}
								/>
								{i === 0 && (
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2"
										style={{ color: "var(--text-secondary)" }}
										aria-label="Toggle password visibility"
									>
										{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</button>
								)}
							</div>
						</div>
					))}
					<button
						type="button"
						className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
						style={{ background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }}
					>
						Update Password
					</button>
				</div>
			</SettingCard>

			<SettingCard title="Two-Factor Authentication" description="Add an extra layer of security to your account">
				<div className="-mt-2">
					<ToggleRow
						label="Two-Factor Authentication (2FA)"
						description="Use an authenticator app for authentication when signing in"
						enabled={twoFactor}
						onToggle={() => setTwoFactor(!twoFactor)}
					/>
					<ToggleRow
						label="New Login Alerts"
						description="Receive email alerts when a login occurs from an unrecognized device"
						enabled={loginAlert}
						onToggle={() => setLoginAlert(!loginAlert)}
					/>
					<ToggleRow
						label="Remember Session for 30 Days"
						description="Stay signed in for 30 days on trusted devices"
						enabled={sessionRemember}
						onToggle={() => setSessionRemember(!sessionRemember)}
					/>
				</div>
			</SettingCard>

			<SettingCard title="Active Devices" description="Devices currently logged into your account">
				{[
					{ device: "Chrome · Windows 11", location: "Jakarta, Indonesia", current: true, icon: Monitor },
					{ device: "Safari · iPhone 15", location: "Jakarta, Indonesia", current: false, icon: Smartphone },
				].map((session, i) => (
					<div
						key={i}
						className="flex items-center justify-between py-3.5"
						style={{ borderBottom: "1px solid var(--border)" }}
					>
						<div className="flex items-center gap-3">
							<div
								className="h-9 w-9 rounded-xl flex items-center justify-center"
								style={{ background: "var(--thead-bg)" }}
							>
								<session.icon className="h-4 w-4" style={{ color: "var(--text-secondary)" } as React.CSSProperties} />
							</div>
							<div>
								<div className="flex items-center gap-2">
									<p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
										{session.device}
									</p>
									{session.current && (
										<span
											className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
											style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a" }}
										>
											Active
										</span>
									)}
								</div>
								<p className="text-xs" style={{ color: "var(--text-secondary)" }}>
									{session.location}
								</p>
							</div>
						</div>
						{!session.current && (
							<button type="button" className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
								Sign out
							</button>
						)}
					</div>
				))}
			</SettingCard>
		</div>
	);
}
