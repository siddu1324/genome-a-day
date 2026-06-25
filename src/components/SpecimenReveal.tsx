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
    <div className="relative z-10 grid min-h-[690px] items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
      <div className="relative flex min-h-[360px] items-center justify-center">
        <div className="absolute inset-8 border border-[rgba(143,247,214,0.16)] bg-[radial-gradient(ellipse_at_center,rgba(143,247,214,0.12),transparent_62%)] shadow-[inset_0_0_70px_rgba(143,247,214,0.1)]" />
        <motion.svg
          aria-label="Axolotl silhouette"
          className="relative h-auto w-full max-w-[620px] drop-shadow-[0_0_28px_rgba(143,247,214,0.42)]"
          fill="none"
          initial={reducedMotion ? false : { opacity: 0.36 }}
          animate={{ opacity: 1 }}
          transition={transition(0.3 * short, 1.2 * short)}
          viewBox="0 0 680 360"
        >
          <motion.path
            d="M183 169 C230 103 381 95 471 151 C526 185 543 242 488 271 C420 307 271 292 194 233 C163 209 156 189 183 169 Z"
            fill="rgba(143,247,214,0.06)"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(2.1 * short, 1 * short)}
          />
          {[
            "M164 175 C226 111 383 99 471 151 C527 185 541 239 489 270 C420 308 266 291 195 231 C163 203 148 187 164 175 Z",
            "M501 172 C572 138 614 155 627 197 C591 193 549 206 509 228",
            "M218 220 C190 240 159 252 125 258",
            "M268 252 C249 286 222 307 187 315",
            "M395 250 C413 287 443 309 484 318",
            "M256 137 C231 115 207 91 196 58",
            "M238 145 C207 133 176 117 151 87",
            "M221 158 C184 154 148 147 112 127",
            "M470 140 C494 113 511 88 522 57",
            "M489 154 C524 144 555 128 581 96",
            "M501 173 C540 173 575 166 611 145",
          ].map((path, index) => (
            <motion.path
              d={path}
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              key={path}
              stroke={index < 5 ? "rgba(143,247,214,0.92)" : "rgba(217,168,92,0.82)"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={index === 0 ? 5 : 4}
              transition={transition((0.2 + index * 0.12) * short, 1.8 * short)}
            />
          ))}
          <motion.circle
            animate={{ opacity: [0.4, 1, 0.55] }}
            cx="286"
            cy="154"
            fill="var(--ctenophore)"
            r="5"
            transition={reducedMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.svg>
      </div>

      <div className="mx-auto max-w-xl lg:mx-0">
        <motion.p
          className="font-mono text-xs text-[var(--ctenophore)]"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(1.8 * short, 0.8 * short)}
        >
          SPECIMEN 001 / ACTIVE SIGNAL
        </motion.p>
        <motion.h1
          className="text-balance mt-4 font-serif text-5xl leading-tight text-[var(--bone)] sm:text-6xl lg:text-7xl"
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
        <div className="mt-8 space-y-4">
          {specimen.story.slice(0, 3).map((line, index) => (
            <motion.p
              className="text-pretty text-lg leading-8 text-[var(--bone)]"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              key={line}
              transition={transition((3.1 + index * 0.55) * short, 0.85 * short)}
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            className="text-pretty font-serif text-2xl leading-9 text-[var(--anglerfish-amber)]"
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
