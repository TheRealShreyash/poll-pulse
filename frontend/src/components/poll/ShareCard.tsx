import { forwardRef } from "react";
import type { PollWithOptions } from "#/lib/types";

function calcPcts(counts: number[]): number[] {
  const total = counts.reduce((a, b) => a + b, 0);
  if (!total) return counts.map(() => 0);
  return counts.map((c) => Math.round((c / total) * 100));
}

export const ShareCard = forwardRef<HTMLDivElement, { poll: PollWithOptions }>(
  ({ poll }, ref) => {
    const total = poll.totalResponses;
    const pcts = calcPcts(poll.options.map((o) => o.count));
    const topOption = poll.options.reduce(
      (a, b) => (a.count > b.count ? a : b),
      poll.options[0],
    );
    const topPct = Math.max(...pcts);

    return (
      <div
        ref={ref}
        className="w-200 bg-linear-to-br from-[#0f0f12] to-[#1a1a1e] p-8 rounded-3xl shadow-2xl border border-white/10 font-sans"
      >
        {/* Header with logo + live badge */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-linear-to-br from-green-400 to-emerald-600 rounded-md rotate-6 shadow-lg" />
            <span className="font-bold text-xl tracking-tight text-white">
              Pulse
            </span>
          </div>
          {poll.status === "LIVE" && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-400">Live</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white leading-tight mb-4">
          {poll.title}
        </h1>

        {/* Winner highlight */}
        <div className="bg-white/5 rounded-xl p-4 mb-6 border-l-4 border-green-500">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Leading option
          </p>
          <p className="text-xl font-semibold text-green-400">
            {topOption.text}
          </p>
          <div className="flex gap-3 mt-1 text-sm text-gray-300">
            <span>{topOption.count} votes</span>
            <span>•</span>
            <span>{topPct}%</span>
          </div>
        </div>

        {/* Options with bars */}
        <div className="space-y-3">
          {poll.options.map((opt, i) => (
            <div key={opt.id}>
              <div className="flex justify-between text-xs text-gray-300 mb-1">
                <span>{opt.text}</span>
                <span className="font-mono">{pcts[i]}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${pcts[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer stats */}
        <div className="flex justify-between items-end mt-6 pt-4 border-t border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Total responses
            </p>
            <p className="text-2xl font-bold tabular-nums text-white">
              {total}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Poll ID
            </p>
            <p className="text-xs font-mono text-gray-400">
              {poll.id.slice(-8)}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

ShareCard.displayName = "ShareCard";
