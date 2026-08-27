interface SettingCardProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function SettingCard({ title, description, children }: SettingCardProps) {
	return (
		<div
			className="rounded-2xl overflow-hidden transition-colors duration-300"
			style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
		>
			<div
				className="px-4 py-2"
				style={{ borderBottom: "1px solid var(--border)", background: "var(--thead-bg)" }}
			>
				<h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
					{title}
				</h3>
				{description && (
					<p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
						{description}
					</p>
				)}
			</div>
			<div className="p-6">{children}</div>
		</div>
	);
}
