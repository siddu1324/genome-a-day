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
      <section className="relative overflow-hidden border-b border-[rgba(143,247,214,0.1)] bg-[linear-gradient(180deg,rgba(6,9,12,0.98),rgba(13,17,23,0.72))]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.035)_1px,transparent_1px)] bg-[size:84px_100%]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:py-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-[var(--ctenophore)]">TODAY&apos;S STORY</p>
            <h2 className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--bone)] sm:text-5xl">
              A living construction site under the skin
            </h2>
            <div className="mt-8">
              <StoryPanel specimen={specimen} />
            </div>
          </div>
          <LogbookPreview specimen={specimen} />
        </div>
      </section>
    </main>
  );
}
