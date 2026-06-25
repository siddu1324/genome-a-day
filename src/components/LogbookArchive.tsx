"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleDashed, RadioTower } from "lucide-react";
import { useLogbook } from "@/lib/logbook";
import type { Specimen } from "@/types/specimen";

type LogbookArchiveProps = {
  specimen: Specimen;
};

const futureSignals = ["unknown signal 002", "unknown signal 003", "unknown signal 004", "unknown signal 005"];

export function LogbookArchive({ specimen }: LogbookArchiveProps) {
  const logbook = useLogbook();
  const isRead = logbook.readSpecimens.includes(specimen.id);
  const isSaved = logbook.savedSpecimens.includes(specimen.id);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs text-[var(--ctenophore)]">PERSONAL FIELD ARCHIVE</p>
          <h1 className="text-balance mt-4 font-serif text-5xl leading-tight text-[var(--bone)] sm:text-6xl">
            Signals Recorded
          </h1>
          <p className="text-pretty mt-5 max-w-xl text-lg leading-8 text-[var(--muted-bone)]">
            A local archive of specimens you have opened and saved in this browser.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="border border-white/10 bg-white/[0.03] p-4">
              <p className="font-mono text-xs text-[var(--muted-bone)]">Read</p>
              <p className="mt-3 text-3xl text-[var(--bone)]">{logbook.readSpecimens.length}</p>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-4">
              <p className="font-mono text-xs text-[var(--muted-bone)]">Saved</p>
              <p className="mt-3 text-3xl text-[var(--bone)]">{logbook.savedSpecimens.length}</p>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-4">
              <p className="font-mono text-xs text-[var(--muted-bone)]">Streak</p>
              <p className="mt-3 text-3xl text-[var(--bone)]">{logbook.streak}</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[rgba(13,17,23,0.52)] p-5 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.05)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="relative">
            <div className="flex items-start gap-4 border border-[rgba(143,247,214,0.24)] bg-[rgba(143,247,214,0.07)] p-5 shadow-[0_0_48px_rgba(143,247,214,0.08)]">
              <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center border border-[rgba(143,247,214,0.42)] bg-[rgba(143,247,214,0.12)] text-[var(--ctenophore)]">
                {isSaved ? <Check aria-hidden="true" size={22} /> : <RadioTower aria-hidden="true" size={22} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-[var(--ctenophore)]">SPECIMEN 001</p>
                <h2 className="mt-2 font-serif text-3xl text-[var(--bone)]">{specimen.commonName}</h2>
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

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {futureSignals.map((signal) => (
                <div className="border border-dashed border-white/10 bg-white/[0.025] p-5 opacity-65" key={signal}>
                  <CircleDashed className="text-[var(--muted-bone)]" aria-hidden="true" size={22} />
                  <p className="mt-4 font-mono text-xs text-[var(--muted-bone)]">{signal}</p>
                  <p className="mt-2 text-sm text-[var(--muted-bone)]">Unknown signal</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
