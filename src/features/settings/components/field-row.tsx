interface FieldRowProps {
	label: string;
	value: string;
	icon?: React.ElementType;
	onEdit?: () => void;
}

export function FieldRow({ label, value, icon: Icon, onEdit }: FieldRowProps) {
	return (
		<div className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid var(--border)" }}>
			<div className="flex items-center gap-3">
				{Icon && (
					<div
						className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
						style={{ background: "var(--thead-bg)" }}
					>
						<Icon className="h-4 w-4" style={{ color: "var(--text-secondary)" } as React.CSSProperties} />
					</div>
				)}
				<div>
					<p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
						{label}
					</p>
					<p className="text-sm font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>
						{value}
					</p>
				</div>
			</div>
			<button
				type="button"
				onClick={onEdit}
				className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
				style={{ color: "var(--nav-active-text)", background: "var(--nav-active-bg)" }}
				onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
				onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
			>
				Edit
			</button>
		</div>
	);
}
