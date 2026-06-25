import { LogbookPreview } from "@/components/LogbookPreview";
import { MetadataStrip } from "@/components/MetadataStrip";
import { SpecimenChamber } from "@/components/SpecimenChamber";
import { StoryPanel } from "@/components/StoryPanel";
import { TopNav } from "@/components/TopNav";
import { getTodaySpecimen } from "@/lib/specimenUtils";

export default function Home() {
  const specimen = getTodaySpecimen();

  return (
    <main className="min-h-screen bg-[var(--abyss)] text-[var(--bone)]">
      <TopNav />
      <SpecimenChamber specimen={specimen} />
      <MetadataStrip specimen={specimen} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <p className="font-mono text-xs text-[var(--ctenophore)]">TODAY&apos;S STORY</p>
          <h2 className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--bone)] sm:text-5xl">
            A living construction site under the skin
          </h2>
          <div className="mt-8">
            <StoryPanel specimen={specimen} />
          </div>
        </div>
        <LogbookPreview specimen={specimen} />
      </section>
    </main>
  );
}
