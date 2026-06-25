"use client";

import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";
import { useLogbook } from "@/lib/logbook";
import type { Specimen } from "@/types/specimen";

type LogbookPreviewProps = {
  specimen: Specimen;
};

export function LogbookPreview({ specimen }: LogbookPreviewProps) {
  const logbook = useLogbook();
  const isRead = logbook.readSpecimens.includes(specimen.id);
  const isSaved = logbook.savedSpecimens.includes(specimen.id);
  const status = isSaved ? "Saved to your logbook" : isRead ? "Read signal recorded" : "Signal pending";

  return (
    <aside className="relative overflow-hidden border border-[rgba(143,247,214,0.16)] bg-[rgba(13,17,23,0.58)] p-5 shadow-[0_0_50px_rgba(0,0,0,0.18)]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.04)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="flex items-center justify-between gap-4">
        <div className="relative">
          <p className="font-mono text-xs text-[var(--ctenophore)]">LOGBOOK SIGNAL</p>
          <h2 className="mt-2 font-serif text-2xl text-[var(--bone)]">Archive Preview</h2>
        </div>
        <BookMarked className="relative text-[var(--anglerfish-amber)]" aria-hidden="true" size={24} />
      </div>

      <div className="relative mt-6 h-52 border border-[rgba(143,247,214,0.13)] bg-[rgba(6,9,12,0.28)]">
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 340 210">
          <path d="M70 138 L150 92 L236 132 L282 74" stroke="rgba(143,247,214,0.18)" strokeDasharray="4 7" />
          <path d="M150 92 L110 52 M236 132 L202 168" stroke="rgba(217,168,92,0.13)" strokeDasharray="3 8" />
        </svg>
        {[
          { left: "21%", top: "66%", active: false },
          { left: "44%", top: "43%", active: true },
          { left: "69%", top: "63%", active: false },
          { left: "83%", top: "34%", active: false },
          { left: "31%", top: "25%", active: false },
        ].map((node, index) => (
          <span
            className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 border ${
              node.active
                ? "border-[var(--ctenophore)] bg-[var(--ctenophore)] shadow-[0_0_24px_rgba(143,247,214,0.85)]"
                : "border-[rgba(169,165,154,0.52)] bg-[rgba(169,165,154,0.08)]"
            }`}
            key={`${node.left}-${node.top}`}
            style={{ left: node.left, top: node.top }}
          >
            <span className="sr-only">{index === 1 ? specimen.commonName : "Unknown signal"}</span>
          </span>
        ))}
        <div className="absolute bottom-4 left-4 right-4 border border-[rgba(143,247,214,0.18)] bg-[rgba(6,9,12,0.58)] p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ctenophore)]">SPECIMEN 001</p>
          <p className="mt-1 text-sm font-semibold text-[var(--bone)]">{specimen.commonName}</p>
          <p className="mt-1 text-xs text-[var(--muted-bone)]">{status}</p>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 border-y border-[rgba(143,247,214,0.12)] py-3">
        {[
          ["Read", logbook.readSpecimens.length],
          ["Saved", logbook.savedSpecimens.length],
          ["Streak", logbook.streak],
        ].map(([label, value]) => (
          <div className="border-r border-white/10 px-3 last:border-r-0" key={label}>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-bone)]">{label}</p>
            <p className="mt-1 text-xl text-[var(--bone)]">{value}</p>
          </div>
        ))}
      </div>

      <Link className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ctenophore)]" href="/logbook">
        Open Logbook
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </aside>
  );
}
