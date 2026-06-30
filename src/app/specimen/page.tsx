import { redirect } from "next/navigation";
import { getTodaySpecimen } from "@/lib/specimenUtils";

export const dynamic = "force-dynamic";

export default function SpecimenIndexPage() {
  const specimen = getTodaySpecimen();

  redirect(`/specimen/${specimen.slug}`);
}
