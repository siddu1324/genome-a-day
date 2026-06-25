"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import type { Specimen } from "@/types/specimen";
import { CopyLinkedInButton } from "@/components/CopyLinkedInButton";
import { SaveSpecimenButton } from "@/components/SaveSpecimenButton";

type SpecimenRevealProps = {
  specimen: Specimen;
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

export function SpecimenReveal({ specimen }: SpecimenRevealProps) {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
  const short = reducedMotion ? 0 : 1;

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
        <motion.svg
          aria-label="Axolotl silhouette"
          className="relative h-auto w-full max-w-[610px] drop-shadow-[0_0_34px_rgba(143,247,214,0.5)]"
          fill="none"
          initial={reducedMotion ? false : { opacity: 0.36 }}
          animate={{ opacity: 1 }}
          transition={transition(0.3 * short, 1.2 * short)}
          viewBox="0 0 680 360"
        >
          <defs>
            <filter id="axolotlGlow" x="-30%" y="-40%" width="160%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M170 176 C222 104 381 99 475 149 C528 178 548 224 508 256 C452 301 279 295 188 226 C157 203 147 187 170 176 Z"
            fill="rgba(143,247,214,0.075)"
            filter="url(#axolotlGlow)"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(2.1 * short, 1 * short)}
          />
          {[
            "M158 177 C220 105 380 98 476 148 C532 177 550 224 507 257 C448 303 274 294 187 226 C154 200 141 187 158 177 Z",
            "M498 171 C558 137 609 151 628 194 C590 190 548 203 510 228",
            "M238 187 C296 153 394 156 459 190",
            "M217 221 C188 242 156 253 119 260",
            "M271 252 C249 287 219 308 181 316",
            "M393 251 C414 288 446 310 489 318",
            "M257 138 C233 113 210 88 199 56",
            "M239 146 C207 132 178 114 153 84",
            "M222 159 C185 155 150 146 113 125",
            "M472 139 C495 113 512 86 523 55",
            "M490 153 C526 142 558 126 585 93",
            "M501 172 C541 172 577 164 614 143",
          ].map((path, index) => (
            <motion.path
              d={path}
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              key={path}
              stroke={index < 6 ? "rgba(143,247,214,0.92)" : "rgba(217,168,92,0.82)"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={index === 0 ? 5 : index === 2 ? 2.5 : 4}
              transition={transition((0.2 + index * 0.12) * short, 1.8 * short)}
            />
          ))}
          <motion.path
            d="M236 204 C300 229 394 232 464 207"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.56 }}
            stroke="rgba(237,234,226,0.36)"
            strokeLinecap="round"
            strokeWidth="2"
            transition={transition(1.7 * short, 1.5 * short)}
          />
          <motion.circle
            animate={{ opacity: [0.4, 1, 0.55] }}
            cx="285"
            cy="158"
            fill="var(--ctenophore)"
            r="5"
            transition={reducedMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.svg>
      </div>

      <div className="mx-auto max-w-[34rem] lg:mx-0">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ctenophore)]"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(1.8 * short, 0.8 * short)}
        >
          SPECIMEN 001 / ACTIVE SIGNAL
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
