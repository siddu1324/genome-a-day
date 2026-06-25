"use client";

import { Bookmark, Check } from "lucide-react";
import { useSaveSpecimen } from "@/lib/logbook";

type SaveSpecimenButtonProps = {
  specimenId: string;
  compact?: boolean;
};

export function SaveSpecimenButton({ specimenId, compact = false }: SaveSpecimenButtonProps) {
  const { save, isSaved } = useSaveSpecimen(specimenId);
  const Icon = isSaved ? Check : Bookmark;

  return (
    <button
      className={`inline-flex h-11 items-center justify-center gap-2 border border-[rgba(143,247,214,0.34)] bg-[rgba(143,247,214,0.1)] px-4 text-sm font-semibold text-[var(--bone)] transition hover:border-[rgba(143,247,214,0.72)] hover:bg-[rgba(143,247,214,0.18)] ${compact ? "w-full sm:w-auto" : "min-w-44"}`}
      onClick={save}
      type="button"
    >
      <Icon aria-hidden="true" size={17} />
      {isSaved ? "Saved" : "Save to Logbook"}
    </button>
  );
}
