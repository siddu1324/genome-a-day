import type { Specimen } from "@/types/specimen";

type StoryPanelProps = {
  specimen: Specimen;
  large?: boolean;
};

export function StoryPanel({ specimen, large = false }: StoryPanelProps) {
  return (
    <article className="max-w-3xl space-y-5">
      {specimen.story.map((line, index) => (
        <p
          className={`text-pretty grid grid-cols-[2.75rem_1fr] gap-3 border-l border-[rgba(143,247,214,0.18)] pl-4 text-[var(--bone)] ${large ? "text-xl leading-9" : "text-lg leading-8"}`}
          key={line}
        >
          <span className="pt-1 font-mono text-[11px] text-[var(--ctenophore)]">FIELD {String(index + 1).padStart(2, "0")}</span>
          <span>{line}</span>
        </p>
      ))}
      <p className={`text-pretty border-l border-[rgba(217,168,92,0.36)] pl-5 font-serif font-semibold text-[var(--anglerfish-amber)] ${large ? "text-3xl leading-10" : "text-2xl leading-9"}`}>
        {specimen.hookLine}
      </p>
    </article>
  );
}
