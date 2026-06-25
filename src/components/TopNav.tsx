"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Microscope, type LucideIcon } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon?: LucideIcon;
};

const navLinks: NavLink[] = [
  { href: "/specimen/axolotl-regeneration", label: "Specimen" },
  { href: "/logbook", label: "Logbook", icon: BookOpen },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(143,247,214,0.16)] bg-[rgba(6,9,12,0.82)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-[var(--bone)] sm:gap-3 sm:text-sm" href="/">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(143,247,214,0.42)] bg-[rgba(143,247,214,0.07)] text-[var(--ctenophore)] shadow-[0_0_24px_rgba(143,247,214,0.08)]">
            <span className="absolute -right-1 top-1/2 h-px w-2 bg-[rgba(143,247,214,0.52)]" />
            <Microscope aria-hidden="true" size={18} />
          </span>
          <span className="whitespace-nowrap sm:hidden">Genome</span>
          <span className="hidden whitespace-nowrap sm:inline">Genome of the Day</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1 text-sm text-[var(--muted-bone)] sm:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href.startsWith("/specimen") && pathname.startsWith("/specimen"));

            return (
              <Link
                className={`flex h-9 items-center gap-2 border px-2.5 text-[13px] transition sm:px-3 sm:text-sm ${
                  isActive
                    ? "border-[rgba(143,247,214,0.34)] bg-[rgba(143,247,214,0.08)] text-[var(--ctenophore)]"
                    : "border-transparent hover:border-white/10 hover:bg-white/[0.04] hover:text-[var(--bone)]"
                }`}
                href={link.href}
                key={link.href}
              >
                {Icon ? <Icon aria-hidden="true" size={15} /> : null}
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
