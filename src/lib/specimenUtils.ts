import { activeSpecimen, specimens } from "@/data/specimens";
import type { Specimen } from "@/types/specimen";

export function getAllSpecimens(): Specimen[] {
  return specimens;
}

export function getTodaySpecimen(): Specimen {
  return activeSpecimen;
}

export function getSpecimenBySlug(slug: string): Specimen | undefined {
  return specimens.find((specimen) => specimen.slug === slug);
}

export function getSpecimenMetadata(specimen: Specimen) {
  return [
    { label: "Type", value: specimen.type },
    { label: "Habitat", value: specimen.habitat },
    { label: "Weirdness", value: `${specimen.weirdnessScore}/100` },
    { label: "Taxonomy", value: specimen.taxonomyLabel },
  ];
}
