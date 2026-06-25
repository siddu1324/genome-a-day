import type { Specimen } from "@/types/specimen";

type StoryPanelProps = {
  specimen: Specimen;
  large?: boolean;
};

export function StoryPanel({ specimen, large = false }: StoryPanelProps) {
  return (
    <article className="space-y-5">
      {specimen.story.map((line, index) => (
        <p
          className={`text-pretty border-l border-[rgba(143,247,214,0.24)] pl-5 text-[var(--bone)] ${large ? "text-xl leading-9" : "text-lg leading-8"}`}
          key={line}
        >
          <span className="mr-3 font-mono text-xs text-[var(--ctenophore)]">{String(index + 1).padStart(2, "0")}</span>
          {line}
        </p>
      ))}
      <p className={`text-pretty font-serif text-[var(--anglerfish-amber)] ${large ? "text-3xl leading-10" : "text-2xl leading-9"}`}>
        {specimen.hookLine}
      </p>
    </article>
  );
}
