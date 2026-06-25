type DepthGaugeProps = {
  weirdnessScore: number;
};

export function DepthGauge({ weirdnessScore }: DepthGaugeProps) {
  return (
    <div className="hidden h-full min-h-80 w-16 flex-col items-center justify-between border-l border-[rgba(143,247,214,0.22)] py-4 md:flex">
      <span className="font-mono text-[10px] text-[var(--muted-bone)]">000M</span>
      <div className="relative h-52 w-px bg-white/15">
        <div className="absolute bottom-0 left-1/2 h-full w-3 -translate-x-1/2">
          <div
            className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-[var(--ctenophore)] shadow-[0_0_18px_rgba(143,247,214,0.75)]"
            style={{ height: `${weirdnessScore}%` }}
          />
        </div>
        {[0, 25, 50, 75, 100].map((mark) => (
          <span
            className="absolute left-1/2 h-px w-4 -translate-x-1/2 bg-white/25"
            key={mark}
            style={{ bottom: `${mark}%` }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] text-[var(--ctenophore)]">{weirdnessScore}/100</span>
    </div>
  );
}
