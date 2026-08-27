"use client";

import { User, Mail, Phone, MapPin, Globe, Monitor, AlertCircle, Camera } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { SettingCard } from "./setting-card";
import { FieldRow } from "./field-row";

export function AccountTab() {
	const user = useAuthStore((s) => s.user);

	return (
		<div className="space-y-5">
			<SettingCard title="Personal Information" description="Account details displayed on your profile">
				<div className="-mt-2">
					<FieldRow icon={User} label="Full Name" value={user?.name || "Brian Yudhistira"} />
					<FieldRow icon={Mail} label="Email" value={user?.email || "brian@example.com"} />
					<FieldRow icon={Phone} label="Phone Number" value="+62 812 3456 7890" />
					<FieldRow icon={MapPin} label="Location" value="Jakarta, Indonesia" />
				</div>
				<div className="mt-4 flex items-center gap-3 pt-2">
					<button
						type="button"
						className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
						style={{ background: "var(--nav-active-bg)", color: "var(--nav-active-text)" }}
					>
						<Camera className="h-4 w-4" />
						Change Profile Photo
					</button>
				</div>
			</SettingCard>

			<SettingCard title="Account Preferences" description="Language and timezone preferences">
				<div className="-mt-2">
					<FieldRow icon={Globe} label="Language" value="English (US)" />
					<FieldRow icon={Monitor} label="Timezone" value="WIB (UTC+7)" />
				</div>
			</SettingCard>

			<SettingCard title="Danger Zone" description="Irreversible actions that cannot be undone">
				<div
					className="flex items-start gap-4 p-4 rounded-xl"
					style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
				>
					<AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
					<div className="flex-1">
						<p className="text-sm font-semibold text-red-600 dark:text-red-400">Delete Account</p>
						<p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
							Once your account is deleted, all of your resources and data will be permanently removed.
						</p>
					</div>
					<button
						type="button"
						className="px-3 py-1.5 text-xs font-semibold rounded-lg text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
					>
						Delete
					</button>
				</div>
			</SettingCard>
		</div>
	);
}
