import { ExternalLink, ShieldCheck } from "lucide-react";
import type { Specimen } from "@/types/specimen";

type SourceEvidencePanelProps = {
  specimen: Specimen;
};

type SpecimenSource = Specimen["sources"][number];
type SpecimenFact = Specimen["facts"][number];

function formatSourceType(sourceType: SpecimenSource["type"]) {
  return sourceType.replaceAll("_", " ");
}

function formatPublisher(source: SpecimenSource) {
  return source.year ? `${source.publisher} / ${source.year}` : source.publisher;
}

function confidenceClassName(confidence: SpecimenFact["confidence"]) {
  if (confidence === "high") {
    return "border-[rgba(143,247,214,0.28)] text-[var(--ctenophore)]";
  }

  if (confidence === "medium") {
    return "border-[rgba(217,168,92,0.32)] text-[var(--anglerfish-amber)]";
  }

  return "border-white/15 text-[var(--muted-bone)]";
}

export function SourceEvidencePanel({ specimen }: SourceEvidencePanelProps) {
  return (
    <section className="relative overflow-hidden border border-[rgba(143,247,214,0.18)] bg-[rgba(13,17,23,0.62)] p-5 shadow-[0_0_46px_rgba(143,247,214,0.045)]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.035)_1px,transparent_1px)] bg-[size:44px_100%]" />
      <div className="relative flex flex-col gap-4 border-b border-white/10 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-[var(--ctenophore)]">SOURCES / FIELD EVIDENCE</p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--bone)]">Evidence Ledger</h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 border border-[rgba(143,247,214,0.28)] bg-[rgba(143,247,214,0.075)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ctenophore)]">
            <ShieldCheck aria-hidden="true" size={14} />
            {specimen.contentStatus}
          </span>
        </div>
        {specimen.lastFactChecked ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted-bone)]">
            Last fact-checked {specimen.lastFactChecked}
          </p>
        ) : null}
      </div>

      <div className="relative mt-5 space-y-3">
        {specimen.facts.map((fact) => (
          <div className="border border-white/10 bg-white/[0.025] p-4" key={fact.id}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${confidenceClassName(fact.confidence)}`}>
                {fact.confidence} confidence
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(143,247,214,0.56)]">
                {fact.sourceIds.length} source{fact.sourceIds.length === 1 ? "" : "s"}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--bone)]">{fact.claim}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-5 space-y-4">
        {specimen.sources.map((source) => (
          <article className="border border-[rgba(143,247,214,0.14)] bg-[rgba(6,9,12,0.38)] p-4" key={source.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(143,247,214,0.64)]">{formatSourceType(source.type)}</p>
                <h3 className="mt-2 text-base font-semibold leading-6 text-[var(--bone)]">{source.title}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-bone)]">{formatPublisher(source)}</p>
              </div>
              <a
                aria-label={`Open source: ${source.title}`}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-[var(--bone)] transition hover:border-[rgba(143,247,214,0.38)] hover:bg-[rgba(143,247,214,0.08)]"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                Source
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            </div>
            <ul className="mt-4 space-y-2">
              {source.supports.map((support) => (
                <li className="border-l border-[rgba(217,168,92,0.45)] pl-3 text-sm leading-6 text-[var(--muted-bone)]" key={support}>
                  {support}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
