"use client";

import { ExternalLink } from "lucide-react";
import type { Specimen } from "@/types/specimen";
import { getLinkedInShareUrl } from "@/lib/shareText";
import { CopyLinkedInButton } from "@/components/CopyLinkedInButton";

type SharePanelProps = {
  specimen: Specimen;
};

export function SharePanel({ specimen }: SharePanelProps) {
  function openLinkedInShare() {
    window.open(getLinkedInShareUrl(window.location.href), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="border border-[rgba(217,168,92,0.24)] bg-[rgba(217,168,92,0.06)] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[var(--anglerfish-amber)]">LINKEDIN FIELD NOTE</p>
          <h2 className="mt-2 font-serif text-3xl text-[var(--bone)]">Share Copy</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CopyLinkedInButton compact text={specimen.linkedInPost} />
          <button
            className="inline-flex h-11 items-center justify-center gap-2 border border-white/15 bg-white/5 px-4 text-sm font-semibold text-[var(--bone)] transition hover:border-white/30 hover:bg-white/10"
            onClick={openLinkedInShare}
            type="button"
          >
            Open LinkedIn
            <ExternalLink aria-hidden="true" size={17} />
          </button>
        </div>
      </div>
      <pre className="mt-5 max-h-96 overflow-auto whitespace-pre-wrap border border-white/10 bg-[rgba(6,9,12,0.45)] p-4 font-sans text-sm leading-7 text-[var(--bone)]">
        {specimen.linkedInPost}
      </pre>
    </section>
  );
}
