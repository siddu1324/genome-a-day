import type { Metadata } from "next";
import { LogbookArchive } from "@/components/LogbookArchive";
import { TopNav } from "@/components/TopNav";
import { getAllSpecimens, getTodaySpecimen } from "@/lib/specimenUtils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Logbook | Genome of the Day",
  description: "Your local Genome of the Day specimen archive.",
};

export default function LogbookPage() {
  const activeSpecimen = getTodaySpecimen();
  const specimens = getAllSpecimens();

  return (
    <main className="min-h-screen bg-[var(--abyss)] text-[var(--bone)]">
      <TopNav />
      <LogbookArchive activeSpecimen={activeSpecimen} specimens={specimens} />
    </main>
  );
}
