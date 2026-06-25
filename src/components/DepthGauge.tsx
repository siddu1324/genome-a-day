type DepthGaugeProps = {
  weirdnessScore: number;
};

export function DepthGauge({ weirdnessScore }: DepthGaugeProps) {
  return (
    <div className="hidden min-h-[560px] w-24 flex-col items-center justify-center border-l border-[rgba(143,247,214,0.16)] px-4 md:flex">
      <div className="flex h-[24rem] w-full flex-col items-center justify-between border-y border-[rgba(143,247,214,0.14)] py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted-bone)]">surface</span>
        <div className="relative h-60 w-9">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
          <div
            className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-[var(--ctenophore)] shadow-[0_0_18px_rgba(143,247,214,0.75)]"
            style={{ height: `${weirdnessScore}%` }}
          />
          {[0, 25, 50, 75, 100].map((mark) => (
            <span
              className="absolute left-1/2 h-px w-7 -translate-x-1/2 bg-white/22"
              key={mark}
              style={{ bottom: `${mark}%` }}
            />
          ))}
          <span className="absolute -right-4 bottom-[96%] font-mono text-[9px] text-[var(--ctenophore)]">W</span>
        </div>
        <div className="text-center">
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted-bone)]">signal</span>
          <span className="mt-1 block font-mono text-xs text-[var(--ctenophore)]">{weirdnessScore}/100</span>
        </div>
      </div>
    </div>
  );
}
