import Link from "next/link";
import { BookOpen, Microscope } from "lucide-react";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(6,9,12,0.72)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="flex items-center gap-3 text-sm font-semibold text-[var(--bone)]" href="/">
          <span className="flex h-9 w-9 items-center justify-center border border-[rgba(143,247,214,0.38)] bg-[rgba(143,247,214,0.08)] text-[var(--ctenophore)]">
            <Microscope aria-hidden="true" size={18} />
          </span>
          <span>Genome of the Day</span>
        </Link>
        <div className="flex items-center gap-2 text-sm text-[var(--muted-bone)]">
          <Link className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-[var(--bone)]" href="/specimen/axolotl-regeneration">
            Specimen
          </Link>
          <Link className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-[var(--bone)]" href="/logbook">
            <BookOpen aria-hidden="true" size={16} />
            Logbook
          </Link>
        </div>
      </nav>
    </header>
  );
}
