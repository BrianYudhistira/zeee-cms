interface SettingRowProps {
    label: string;
    description?: string;
    children: React.ReactNode;
}

export function SettingRow({ label, description, children }: SettingRowProps) {
    return (
        <div className="flex flex-row justify-between gap-2 rounded-xl duration-300 px-4 py-2" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {label}
                </span>
                {description && (
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {description}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-4">{children}</div>
        </div>
    );
}