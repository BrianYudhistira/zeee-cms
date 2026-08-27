export default function DropdownItem({
  icon,
  label,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-200"
      style={{ color: danger ? undefined : "var(--text-primary)" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--user-hover-bg)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <span className={`text-lg ${danger ? "text-red-500 dark:text-red-400" : ""}`}>{icon}</span>
      <span className={danger ? "text-red-500 dark:text-red-400" : ""}>{label}</span>
    </button>
  );
}