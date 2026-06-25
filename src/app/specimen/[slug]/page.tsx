import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MetadataStrip } from "@/components/MetadataStrip";
import { ReadMarker } from "@/components/ReadMarker";
import { SaveSpecimenButton } from "@/components/SaveSpecimenButton";
import { SharePanel } from "@/components/SharePanel";
import { StoryPanel } from "@/components/StoryPanel";
import { TopNav } from "@/components/TopNav";
import { getAllSpecimens, getSpecimenBySlug } from "@/lib/specimenUtils";

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

  return (
    <main className="min-h-screen bg-[var(--abyss)] text-[var(--bone)]">
      <ReadMarker specimenId={specimen.id} />
      <TopNav />
      <section className="grain-layer relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(16,25,38,0.92),rgba(6,9,12,0.98))]">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <p className="font-mono text-xs text-[var(--ctenophore)]">SPECIMEN 001 / DETAIL ARCHIVE</p>
            <h1 className="text-balance mt-5 font-serif text-5xl leading-tight text-[var(--bone)] sm:text-7xl">
              {specimen.commonName}
            </h1>
            <p className="mt-5 font-mono text-sm italic text-[var(--muted-bone)]">{specimen.scientificName}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SaveSpecimenButton compact specimenId={specimen.id} />
            </div>
          </div>
          <div className="border border-[rgba(143,247,214,0.18)] bg-[rgba(143,247,214,0.05)] p-6">
            <p className="font-mono text-xs text-[var(--ctenophore)]">WHY IT MATTERS</p>
            <p className="text-pretty mt-4 text-xl leading-9 text-[var(--bone)]">{specimen.whyItMatters}</p>
          </div>
        </div>
      </section>
      <MetadataStrip specimen={specimen} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:py-16">
        <div>
          <p className="font-mono text-xs text-[var(--ctenophore)]">RECONSTRUCTED STORY</p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--bone)]">Blastema Biology</h2>
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
          <SharePanel specimen={specimen} />
        </div>
      </section>
    </main>
  );
}
