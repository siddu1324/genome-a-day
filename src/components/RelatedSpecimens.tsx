import Link from "next/link";
import { ArrowRight, Orbit } from "lucide-react";
import type { Specimen } from "@/types/specimen";

type RelatedSpecimensProps = {
  specimen: Specimen;
  specimens: Specimen[];
};

function scoreSpecimen(candidate: Specimen, specimen: Specimen) {
  const currentTags = new Set(specimen.tags);
  const sharedTagCount = candidate.tags.filter((tag) => currentTags.has(tag)).length;
  const typeScore = candidate.type === specimen.type ? 2 : 0;

  return sharedTagCount + typeScore;
}

export function RelatedSpecimens({ specimen, specimens }: RelatedSpecimensProps) {
  const relatedSpecimens = specimens
    .filter((candidate) => candidate.id !== specimen.id)
    .map((candidate) => ({
      specimen: candidate,
      score: scoreSpecimen(candidate, specimen),
    }))
    .sort((left, right) => right.score - left.score || right.specimen.weirdnessScore - left.specimen.weirdnessScore)
    .slice(0, 3);

  if (relatedSpecimens.length === 0) {
    return null;
  }

  return (
    <section className="border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-[var(--muted-bone)]">RELATED SIGNALS</p>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-[var(--bone)]">Archive Neighbors</h2>
        </div>
        <Orbit aria-hidden="true" className="shrink-0 text-[var(--anglerfish-amber)]" size={22} />
      </div>

      <div className="mt-5 grid gap-3">
        {relatedSpecimens.map(({ specimen: related }) => (
          <Link
            aria-label={`Open related specimen ${related.commonName}`}
            className="group flex items-center justify-between gap-4 border border-[rgba(143,247,214,0.12)] bg-[rgba(6,9,12,0.28)] p-4 transition hover:border-[rgba(143,247,214,0.36)] hover:bg-[rgba(143,247,214,0.06)]"
            href={`/specimen/${related.slug}`}
            key={related.id}
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-[var(--bone)]">{related.commonName}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-bone)]">
                {related.type} / {related.weirdnessScore}/100
              </span>
            </span>
            <ArrowRight aria-hidden="true" className="shrink-0 text-[var(--ctenophore)] transition group-hover:translate-x-1" size={16} />
          </Link>
        ))}
      </div>
    </section>
  );
}
