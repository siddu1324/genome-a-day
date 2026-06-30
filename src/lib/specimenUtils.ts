import { activeSpecimen, specimens } from "../data/specimens";
import type { Specimen } from "../types/specimen";

const rotationStartUtc = Date.UTC(2026, 5, 26);
const dayMs = 24 * 60 * 60 * 1000;

function positiveModulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function getUtcDay(value: Date) {
  return Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());
}

export function getAllSpecimens(): Specimen[] {
  return specimens;
}

export function getSpecimenForDate(value: Date): Specimen {
  const dayOffset = Math.floor((getUtcDay(value) - rotationStartUtc) / dayMs);
  return specimens[positiveModulo(dayOffset, specimens.length)] ?? activeSpecimen;
}

export function getTodaySpecimen(value = new Date()): Specimen {
  return getSpecimenForDate(value);
}

export function getSpecimenBySlug(slug: string): Specimen | undefined {
  return specimens.find((specimen) => specimen.slug === slug);
}

export function getSpecimenNumber(specimen: Specimen): number {
  const index = specimens.findIndex((candidate) => candidate.id === specimen.id);
  return index >= 0 ? index + 1 : 1;
}

export function getSpecimenMetadata(specimen: Specimen) {
  return [
    { label: "Type", value: specimen.type },
    { label: "Habitat", value: specimen.habitat },
    { label: "Weirdness", value: `${specimen.weirdnessScore}/100` },
    { label: "Taxonomy", value: specimen.taxonomyLabel },
  ];
}
