import type { Specimen } from "@/types/specimen";
import { getSpecimenMetadata } from "@/lib/specimenUtils";

type MetadataStripProps = {
  specimen: Specimen;
};

export function MetadataStrip({ specimen }: MetadataStripProps) {
  const metadata = getSpecimenMetadata(specimen);

  return (
    <dl className="grid border-y border-white/10 bg-[rgba(13,17,23,0.62)] md:grid-cols-4">
      {metadata.map((item) => (
        <div className="border-white/10 px-5 py-4 md:border-r md:last:border-r-0" key={item.label}>
          <dt className="font-mono text-xs text-[var(--muted-bone)]">{item.label}</dt>
          <dd className="mt-2 text-sm font-medium text-[var(--bone)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
