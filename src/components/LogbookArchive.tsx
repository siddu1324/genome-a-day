"use client";

import Link from "next/link";
import { ArrowRight, Check, Crosshair, RadioTower } from "lucide-react";
import { useLogbook } from "@/lib/logbook";
import type { Specimen } from "@/types/specimen";

type LogbookArchiveProps = {
  specimen: Specimen;
};

const futureSignals = [
  { id: "unknown signal 002", x: "22%", y: "28%" },
  { id: "unknown signal 003", x: "68%", y: "24%" },
  { id: "unknown signal 004", x: "78%", y: "72%" },
  { id: "unknown signal 005", x: "30%", y: "78%" },
  { id: "unknown signal 006", x: "51%", y: "53%" },
];

export function LogbookArchive({ specimen }: LogbookArchiveProps) {
  const logbook = useLogbook();
  const isRead = logbook.readSpecimens.includes(specimen.id);
  const isSaved = logbook.savedSpecimens.includes(specimen.id);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
        <div className="lg:pt-8">
          <p className="font-mono text-xs text-[var(--ctenophore)]">PERSONAL FIELD ARCHIVE</p>
          <h1 className="text-balance mt-4 font-serif text-5xl leading-tight text-[var(--bone)] sm:text-6xl">
            Signals Recorded
          </h1>
          <p className="text-pretty mt-5 max-w-xl text-lg leading-8 text-[var(--muted-bone)]">
            A local archive of specimens you have opened and saved in this browser.
          </p>
          <div className="mt-8 border-y border-[rgba(143,247,214,0.14)] py-4">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                ["Read", logbook.readSpecimens.length],
                ["Saved", logbook.savedSpecimens.length],
                ["Streak", logbook.streak],
              ].map(([label, value]) => (
                <div className="px-4 first:pl-0" key={label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted-bone)]">{label}</p>
                  <p className="mt-2 text-3xl text-[var(--bone)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 max-w-sm font-mono text-xs leading-6 text-[var(--muted-bone)]">
            LOCAL STORAGE ARCHIVE / READ AND SAVE STATES PERSIST IN THIS BROWSER.
          </p>
        </div>

        <div className="relative min-h-[560px] overflow-hidden border border-[rgba(143,247,214,0.16)] bg-[rgba(13,17,23,0.5)] p-4 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.05)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 760 560">
            <path d="M142 150 L360 272 L516 132 L594 404 L236 436 L360 272 L516 132" fill="none" stroke="rgba(143,247,214,0.18)" strokeDasharray="5 9" />
            <path d="M360 272 m-132 0 a132 132 0 1 0 264 0 a132 132 0 1 0 -264 0" fill="none" stroke="rgba(143,247,214,0.08)" />
            <path d="M360 272 m-216 0 a216 216 0 1 0 432 0 a216 216 0 1 0 -432 0" fill="none" stroke="rgba(217,168,92,0.08)" />
          </svg>

          {futureSignals.map((signal) => (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              key={signal.id}
              style={{ left: signal.x, top: signal.y }}
            >
              <span className="block h-4 w-4 border border-dashed border-[rgba(169,165,154,0.54)] bg-[rgba(169,165,154,0.05)]" />
              <span className="mt-2 hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-[rgba(169,165,154,0.62)] sm:block">
                {signal.id}
              </span>
            </div>
          ))}

          <div className="absolute left-[48%] top-[48%] w-[min(88%,28rem)] -translate-x-1/2 -translate-y-1/2 border border-[rgba(143,247,214,0.32)] bg-[rgba(6,9,12,0.72)] p-5 shadow-[0_0_58px_rgba(143,247,214,0.13)] sm:left-[47%] sm:w-[27rem]">
            <div className="flex items-start gap-4">
              <span className="relative mt-1 flex h-12 w-12 shrink-0 items-center justify-center border border-[rgba(143,247,214,0.5)] bg-[rgba(143,247,214,0.12)] text-[var(--ctenophore)] shadow-[0_0_28px_rgba(143,247,214,0.25)]">
                <span className="absolute inset-[-8px] border border-[rgba(217,168,92,0.22)]" />
                {isSaved ? <Check aria-hidden="true" size={22} /> : <RadioTower aria-hidden="true" size={22} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ctenophore)]">SPECIMEN 001 / CURRENT</p>
                <h2 className="mt-2 font-serif text-3xl leading-tight text-[var(--bone)]">{specimen.commonName}</h2>
                <p className="mt-2 text-sm italic text-[var(--muted-bone)]">{specimen.scientificName}</p>
                <p className="mt-4 text-sm text-[var(--muted-bone)]">
                  {isSaved ? "Saved specimen" : isRead ? "Read specimen" : "Unread specimen"}
                </p>
                <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ctenophore)]" href={`/specimen/${specimen.slug}`}>
                  Review specimen
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(217,168,92,0.72)]">
            <Crosshair aria-hidden="true" size={14} />
            Today pulse
          </div>
        </div>
      </div>
    </section>
  );
}
