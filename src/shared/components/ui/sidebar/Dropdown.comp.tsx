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
      className={`flex w-full items-center gap-3 px-3 py-2 text-sm transition
        ${
          danger
            ? "text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/15"
            : "hover:bg-black/5 dark:hover:bg-white/15"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}