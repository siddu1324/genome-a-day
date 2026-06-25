"use client";

import { useState } from "react";
import { Check, Clipboard } from "lucide-react";

type CopyLinkedInButtonProps = {
  text: string;
  compact?: boolean;
};

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const element = document.createElement("textarea");
  element.value = text;
  element.style.position = "fixed";
  element.style.opacity = "0";
  document.body.appendChild(element);
  element.focus();
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
}

export function CopyLinkedInButton({ text, compact = false }: CopyLinkedInButtonProps) {
  const [copied, setCopied] = useState(false);
  const Icon = copied ? Check : Clipboard;

  async function handleCopy() {
    await copyText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      className={`inline-flex h-11 items-center justify-center gap-2 border border-[rgba(217,168,92,0.38)] bg-[rgba(217,168,92,0.11)] px-4 text-sm font-semibold text-[var(--bone)] transition hover:border-[rgba(217,168,92,0.75)] hover:bg-[rgba(217,168,92,0.18)] ${compact ? "w-full sm:w-auto" : "min-w-48"}`}
      onClick={handleCopy}
      type="button"
    >
      <Icon aria-hidden="true" size={17} />
      {copied ? "Copied" : "Copy LinkedIn Post"}
    </button>
  );
}
