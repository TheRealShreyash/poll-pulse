interface AnalyticsBarProps {
  label: string;
  count: number;
  pct: number;
  isLeading?: boolean;
}

export function AnalyticsBar({
  label,
  count,
  pct,
  isLeading,
}: AnalyticsBarProps) {
  return (
    <div className="space-y-1.25">
      <div className="flex items-center justify-between text-[12px]">
        <span className={isLeading ? "text-ink-1 font-medium" : "text-ink-2"}>
          {label}
        </span>
        <span className="text-ink-1 font-medium tabular-nums">
          {count} · {pct}%
        </span>
      </div>
      <div className="h-1.25 w-full rounded-full bg-bg-3 overflow-hidden">
        <div
          className="h-full rounded-full bar-transition"
          style={{
            width: `${pct}%`,
            background: isLeading ? "#22c55e" : "rgba(255,255,255,0.22)",
          }}
        />
      </div>
    </div>
  );
}
