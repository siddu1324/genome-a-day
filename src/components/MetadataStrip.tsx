import type { Specimen } from "@/types/specimen";
import { getSpecimenMetadata } from "@/lib/specimenUtils";

type MetadataStripProps = {
  specimen: Specimen;
};

export function MetadataStrip({ specimen }: MetadataStripProps) {
  const metadata = getSpecimenMetadata(specimen);

  return (
    <dl className="relative overflow-hidden border-y border-[rgba(143,247,214,0.14)] bg-[rgba(13,17,23,0.72)]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,247,214,0.045)_1px,transparent_1px),linear-gradient(rgba(143,247,214,0.035)_1px,transparent_1px)] bg-[size:96px_100%,100%_28px]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {metadata.map((item, index) => (
          <div className="min-h-24 border-white/10 px-4 py-4 md:border-r md:px-5 md:last:border-r-0" key={item.label}>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-bone)]">{item.label}</dt>
              <span className="font-mono text-[10px] text-[rgba(143,247,214,0.52)]">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <dd className="mt-3 text-sm font-semibold leading-6 text-[var(--bone)]">{item.value}</dd>
          </div>
        ))}
      </div>
    </dl>
  );
}
