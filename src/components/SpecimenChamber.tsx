import type { Specimen } from "@/types/specimen";
import { DepthGauge } from "@/components/DepthGauge";
import { ParticleField } from "@/components/ParticleField";
import { ReadMarker } from "@/components/ReadMarker";
import { SpecimenReveal } from "@/components/SpecimenReveal";

type SpecimenChamberProps = {
  specimen: Specimen;
  specimenNumber: number;
};

export function SpecimenChamber({ specimen, specimenNumber }: SpecimenChamberProps) {
  return (
    <section className="grain-layer relative overflow-hidden border-b border-[rgba(143,247,214,0.12)] bg-[linear-gradient(180deg,rgba(16,25,38,0.94),rgba(6,9,12,0.97))]">
      <ReadMarker specimenId={specimen.id} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.04)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.03)_1px,transparent_1px)] bg-[size:120px_120px]" />
      <ParticleField active />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,247,214,0.7),transparent)]" />
      <div className="relative mx-auto flex max-w-7xl">
        <div className="flex-1">
          <SpecimenReveal specimen={specimen} specimenNumber={specimenNumber} />
        </div>
        <DepthGauge weirdnessScore={specimen.weirdnessScore} />
      </div>
    </section>
  );
}
