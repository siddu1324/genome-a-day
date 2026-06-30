import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MetadataStrip } from "@/components/MetadataStrip";
import { ReadMarker } from "@/components/ReadMarker";
import { SaveSpecimenButton } from "@/components/SaveSpecimenButton";
import { SharePanel } from "@/components/SharePanel";
import { SourceEvidencePanel } from "@/components/SourceEvidencePanel";
import { SpecimenSignalGlyph } from "@/components/SpecimenGlyph";
import { StoryPanel } from "@/components/StoryPanel";
import { TopNav } from "@/components/TopNav";
import { getAllSpecimens, getSpecimenBySlug, getSpecimenNumber } from "@/lib/specimenUtils";

type SpecimenPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllSpecimens().map((specimen) => ({
    slug: specimen.slug,
  }));
}

export async function generateMetadata({ params }: SpecimenPageProps): Promise<Metadata> {
  const { slug } = await params;
  const specimen = getSpecimenBySlug(slug);

  if (!specimen) {
    return {
      title: "Specimen Not Found | Genome of the Day",
    };
  }

  return {
    title: `${specimen.commonName} | Genome of the Day`,
    description: specimen.whyItMatters,
  };
}

export default async function SpecimenPage({ params }: SpecimenPageProps) {
  const { slug } = await params;
  const specimen = getSpecimenBySlug(slug);

  if (!specimen) {
    notFound();
  }

  const specimenNumber = getSpecimenNumber(specimen);
  const specimenLabel = `SPECIMEN ${String(specimenNumber).padStart(3, "0")}`;

  return (
    <main className="min-h-screen bg-[var(--abyss)] text-[var(--bone)]">
      <ReadMarker specimenId={specimen.id} />
      <TopNav />
      <section className="grain-layer relative overflow-hidden border-b border-[rgba(143,247,214,0.12)] bg-[linear-gradient(180deg,rgba(16,25,38,0.9),rgba(6,9,12,0.98))]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.04)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.03)_1px,transparent_1px)] bg-[size:112px_112px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:py-16">
          <div className="lg:pt-8">
            <p className="font-mono text-xs text-[var(--ctenophore)]">{specimenLabel} / DETAIL ARCHIVE</p>
            <h1 className="text-balance mt-5 max-w-[10ch] font-serif text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[0.98] text-[var(--bone)]">
              {specimen.commonName}
            </h1>
            <p className="mt-5 font-mono text-sm italic text-[var(--muted-bone)]">{specimen.scientificName}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SaveSpecimenButton compact specimenId={specimen.id} />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-[0.75fr_1fr]">
            <div className="relative min-h-72 overflow-hidden border border-[rgba(143,247,214,0.16)] bg-[rgba(13,17,23,0.5)]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.045)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 border border-[rgba(143,247,214,0.16)]" />
              <SpecimenSignalGlyph specimen={specimen} className="absolute inset-0 h-full w-full p-8 drop-shadow-[0_0_24px_rgba(143,247,214,0.42)]" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ctenophore)]">Signal retained</div>
            </div>
            <div className="border border-[rgba(143,247,214,0.2)] bg-[rgba(143,247,214,0.055)] p-6 shadow-[0_0_50px_rgba(143,247,214,0.06)]">
              <p className="font-mono text-xs text-[var(--ctenophore)]">WHY IT MATTERS</p>
              <p className="text-pretty mt-4 text-xl leading-9 text-[var(--bone)]">{specimen.whyItMatters}</p>
            </div>
          </div>
        </div>
      </section>
      <MetadataStrip specimen={specimen} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:py-16">
        <div>
          <p className="font-mono text-xs text-[var(--ctenophore)]">RECONSTRUCTED STORY</p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--bone)]">Signal Narrative</h2>
          <div className="mt-8">
            <StoryPanel large specimen={specimen} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-xs text-[var(--muted-bone)]">TAGS</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {specimen.tags.map((tag) => (
                <span className="border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[var(--bone)]" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <SourceEvidencePanel specimen={specimen} />
          <SharePanel specimen={specimen} />
        </div>
      </section>
    </main>
  );
}
