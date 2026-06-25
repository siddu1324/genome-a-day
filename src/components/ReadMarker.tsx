"use client";

import { useMarkSpecimenRead } from "@/lib/logbook";

type ReadMarkerProps = {
  specimenId: string;
};

export function ReadMarker({ specimenId }: ReadMarkerProps) {
  useMarkSpecimenRead(specimenId);
  return null;
}
