import type { Metadata } from "next";
import { LogbookArchive } from "@/components/LogbookArchive";
import { TopNav } from "@/components/TopNav";
import { getTodaySpecimen } from "@/lib/specimenUtils";

export const metadata: Metadata = {
  title: "Logbook | Genome of the Day",
  description: "Your local Genome of the Day specimen archive.",
};

export default function LogbookPage() {
  const specimen = getTodaySpecimen();

  return (
    <main className="min-h-screen bg-[var(--abyss)] text-[var(--bone)]">
      <TopNav />
      <LogbookArchive specimen={specimen} />
    </main>
  );
}
