interface ToggleRowProps {
	label: string;
	description: string;
	enabled: boolean;
	onToggle: () => void;
}

export function ToggleRow({ label, description, enabled, onToggle }: ToggleRowProps) {
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
			<button
				type="button"
				onClick={onToggle}
				className="relative h-5 w-9 rounded-full transition-all duration-300 flex-shrink-0"
				style={{
					background: enabled ? "var(--nav-active-bg)" : "var(--border)",
				}}
				aria-label="Toggle setting"
			>
				<span
					className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300"
					style={{ transform: enabled ? "translateX(16px)" : "translateX(0)" }}
				/>
			</button>
		</div>
	);
}
