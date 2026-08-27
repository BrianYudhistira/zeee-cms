interface SettingRowProps {
    label: string;
    description?: string;
    children: React.ReactNode;
}

export function SettingRow({ label, description, children }: SettingRowProps) {
    return (
        <div className="flex items-center justify-between py-4" style={{ borderBottom: "1px solid var(--border)" }}>
			<div>
				<p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
					{label}
				</p>
				<p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
					{description}
				</p>
			</div>
			{children}
		</div>
    );
}