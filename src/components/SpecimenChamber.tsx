import type { Specimen } from "@/types/specimen";
import { DepthGauge } from "@/components/DepthGauge";
import { ParticleField } from "@/components/ParticleField";
import { ReadMarker } from "@/components/ReadMarker";
import { SpecimenReveal } from "@/components/SpecimenReveal";

type SpecimenChamberProps = {
  specimen: Specimen;
};

export function SpecimenChamber({ specimen }: SpecimenChamberProps) {
  return (
    <section className="grain-layer relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(16,25,38,0.95),rgba(6,9,12,0.96))]">
      <ReadMarker specimenId={specimen.id} />
      <ParticleField active />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,247,214,0.7),transparent)]" />
      <div className="relative mx-auto flex max-w-7xl">
        <div className="flex-1">
          <SpecimenReveal specimen={specimen} />
        </div>
        <DepthGauge weirdnessScore={specimen.weirdnessScore} />
      </div>
    </section>
  );
}
