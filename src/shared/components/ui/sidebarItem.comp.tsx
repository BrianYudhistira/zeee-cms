import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`${isActive ? "bg-black/10 dark:bg-white/10" : ""} group rounded-lg py-2 px-3 transition hover:bg-black/15 dark:hover:bg-white/15`}>
      <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}