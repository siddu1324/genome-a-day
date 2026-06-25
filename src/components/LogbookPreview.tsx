"use client";

import Link from "next/link";
import { ArrowRight, BookMarked, Radio } from "lucide-react";
import { useLogbook } from "@/lib/logbook";
import type { Specimen } from "@/types/specimen";

type LogbookPreviewProps = {
  specimen: Specimen;
};

export function LogbookPreview({ specimen }: LogbookPreviewProps) {
  const logbook = useLogbook();
  const isRead = logbook.readSpecimens.includes(specimen.id);
  const isSaved = logbook.savedSpecimens.includes(specimen.id);

  return (
    <aside className="border border-white/10 bg-[rgba(13,17,23,0.58)] p-5 shadow-[0_0_50px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-[var(--ctenophore)]">LOGBOOK SIGNAL</p>
          <h2 className="mt-2 font-serif text-2xl text-[var(--bone)]">Archive Preview</h2>
        </div>
        <BookMarked className="text-[var(--anglerfish-amber)]" aria-hidden="true" size={24} />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <div className="border border-white/10 bg-white/[0.03] p-3">
          <p className="font-mono text-xs text-[var(--muted-bone)]">Read</p>
          <p className="mt-2 text-2xl text-[var(--bone)]">{logbook.readSpecimens.length}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-3">
          <p className="font-mono text-xs text-[var(--muted-bone)]">Saved</p>
          <p className="mt-2 text-2xl text-[var(--bone)]">{logbook.savedSpecimens.length}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-3">
          <p className="font-mono text-xs text-[var(--muted-bone)]">Streak</p>
          <p className="mt-2 text-2xl text-[var(--bone)]">{logbook.streak}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 border border-[rgba(143,247,214,0.18)] bg-[rgba(143,247,214,0.06)] p-4">
        <Radio className="shrink-0 text-[var(--ctenophore)]" aria-hidden="true" size={20} />
        <div>
          <p className="text-sm font-semibold text-[var(--bone)]">{specimen.commonName}</p>
          <p className="mt-1 text-sm text-[var(--muted-bone)]">
            {isSaved ? "Saved to your logbook" : isRead ? "Read signal recorded" : "Signal pending"}
          </p>
        </div>
      </div>

      <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ctenophore)]" href="/logbook">
        Open Logbook
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </aside>
  );
}
