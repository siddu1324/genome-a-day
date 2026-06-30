"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import type { Specimen } from "@/types/specimen";
import { CopyLinkedInButton } from "@/components/CopyLinkedInButton";
import { SaveSpecimenButton } from "@/components/SaveSpecimenButton";
import { SpecimenSignalGlyph } from "@/components/SpecimenGlyph";

type SpecimenRevealProps = {
  specimen: Specimen;
  specimenNumber: number;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function transition(delay = 0, duration = 0.8): Transition {
  return { delay, duration, ease: "easeOut" };
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function SpecimenReveal({ specimen, specimenNumber }: SpecimenRevealProps) {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
  const short = reducedMotion ? 0 : 1;
  const specimenLabel = `SPECIMEN ${String(specimenNumber).padStart(3, "0")}`;

  return (
    <div
      className="relative z-10 grid min-h-[calc(100svh-10rem)] items-center gap-8 px-4 py-8 sm:min-h-[620px] sm:px-8 lg:min-h-[650px] lg:grid-cols-[0.96fr_1.04fr] lg:px-10"
      key={reducedMotion ? "reduced" : "motion"}
    >
      <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[410px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(143,247,214,0.16),rgba(143,247,214,0.045)_42%,transparent_68%)]" />
        <div className="absolute inset-3 border border-[rgba(143,247,214,0.12)] bg-[linear-gradient(90deg,rgba(143,247,214,0.045)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.035)_1px,transparent_1px)] bg-[size:52px_52px] shadow-[inset_0_0_90px_rgba(143,247,214,0.13),0_0_70px_rgba(0,0,0,0.34)] sm:inset-7" />
        <div className="absolute inset-8 border border-[rgba(143,247,214,0.18)] opacity-70 sm:inset-12" />
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 border border-[rgba(143,247,214,0.13)] sm:h-72 sm:w-72" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 border border-[rgba(143,247,214,0.08)] sm:h-96 sm:w-96" />
        <div className="absolute inset-x-10 top-10 h-px bg-[linear-gradient(90deg,transparent,rgba(143,247,214,0.56),transparent)] sm:inset-x-16" />
        <div className="absolute bottom-10 left-10 h-10 w-10 border-b border-l border-[rgba(217,168,92,0.34)] sm:bottom-14 sm:left-14" />
        <div className="absolute right-10 top-10 h-10 w-10 border-r border-t border-[rgba(143,247,214,0.34)] sm:right-14 sm:top-14" />
        <motion.div
          initial={reducedMotion ? false : { opacity: 0.36 }}
          animate={{ opacity: 1 }}
          transition={transition(0.3 * short, 1.2 * short)}
          className="relative w-full max-w-[610px] drop-shadow-[0_0_34px_rgba(143,247,214,0.5)]"
        >
          <SpecimenSignalGlyph specimen={specimen} className="h-auto w-full" />
        </motion.div>
      </div>

      <div className="mx-auto max-w-[34rem] lg:mx-0">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ctenophore)]"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(1.8 * short, 0.8 * short)}
        >
          {specimenLabel} / ACTIVE SIGNAL
        </motion.p>
        <motion.h1
          className="text-balance mt-4 max-w-[12ch] font-serif text-[clamp(3.2rem,6.2vw,5.35rem)] font-semibold leading-[0.98] text-[var(--bone)]"
          initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={transition(2.2 * short, 1 * short)}
        >
          {specimen.commonName}
        </motion.h1>
        <motion.p
          className="mt-4 font-mono text-sm italic text-[var(--muted-bone)]"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition(2.8 * short, 0.8 * short)}
        >
          {specimen.scientificName}
        </motion.p>
        <div className="mt-7 space-y-4">
          {specimen.story.slice(0, 3).map((line, index) => (
            <motion.p
              className="text-pretty max-w-[33rem] text-[1.05rem] leading-8 text-[var(--bone)]"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              key={line}
              transition={transition((3.1 + index * 0.55) * short, 0.85 * short)}
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            className="text-pretty max-w-[31rem] font-serif text-2xl font-semibold leading-9 text-[var(--anglerfish-amber)]"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(4.9 * short, 0.9 * short)}
          >
            {specimen.hookLine}
          </motion.p>
        </div>
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(5.5 * short, 0.8 * short)}
        >
          <SaveSpecimenButton compact specimenId={specimen.id} />
          <CopyLinkedInButton compact text={specimen.linkedInPost} />
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 border border-white/15 bg-white/5 px-4 text-sm font-semibold text-[var(--bone)] transition hover:border-white/30 hover:bg-white/10"
            href={`/specimen/${specimen.slug}`}
          >
            Go Deeper
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
