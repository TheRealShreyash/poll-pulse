import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "#/components/ui/TopBar";
import { Badge } from "#/components/ui/Badge";
import { Button } from "#/components/ui/Button";
import { OptionBar } from "#/components/poll/OptionBar";
import { LiveDot } from "#/components/poll/LiveDot";
import { AnalyticsBar } from "#/components/poll/AnalyticsBar";
import { usePollSocket } from "#/hooks/usePollSocket";
import { useCountdown } from "#/hooks/useCountdown";
import type { PollWithOptions } from "#/lib/types";
import { getPoll, checkVote, respondToPoll } from "#/services/poll";
import { authenticate, redirectToIrisLogin } from "#/services/auth";

export const Route = createFileRoute("/poll/$pollId")({
  loader: async ({ params }) => {
    const data = await getPoll(params.pollId);
    const voted = await checkVote(params.pollId);
    return { data, voted };
  },
  component: PollPage,
});

function calcPcts(counts: number[]): number[] {
  const total = counts.reduce((a, b) => a + b, 0);
  if (!total) return counts.map(() => 0);
  return counts.map((c) => Math.round((c / total) * 100));
}

function PollPage() {
  const { pollId } = Route.useParams();
  const { data, voted } = Route.useLoaderData();

  const [poll, setPoll] = useState<PollWithOptions>(data);
  const [selected, setSelected] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(voted);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    authenticate().then(setIsLoggedIn);
  }, []);

  const isActive = poll.status === "LIVE";
  const isPublished = poll.status === "PUBLISHED";
  const isClosed = poll.status === "ENDED";

  const showBars = hasVoted || isPublished || isClosed;

  const authBlocked = !poll.isAnonymous && isLoggedIn === false;

  const canVote = isActive && !hasVoted && !submitting && !authBlocked;

  const countdown = useCountdown(poll.expiresAt);
  const pcts = calcPcts(poll.options.map((o) => o.count));

  usePollSocket({
    pollId,
    enabled: (isActive && poll.showLiveResults) || voted,
    onVoteUpdate: ({ counts, total }) => {
      setPoll((prev) => ({
        ...prev,
        options: prev.options.map((o, i) => ({ ...o, count: counts[i] })),
        totalResponses: total,
      }));
    },
    onPollClosed: () => setPoll((prev) => ({ ...prev, status: "ENDED" })),
  });

  async function handleVote() {
    if (selected === null || !canVote) return;
    setSubmitting(true);
    setError(null);
    try {
      const optionId = poll.options[selected].id;
      await respondToPoll({ pollId, optionId });
      setHasVoted(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to submit. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (isPublished) {
    const leadingIdx = pcts.indexOf(Math.max(...pcts));
    return (
      <>
        <TopBar right={<Badge variant="PUBLISHED" />} />
        <main className="max-w-lg mx-auto px-4 py-10 animate-slide-up">
          <p className="text-[10px] font-medium text-ink-3 uppercase tracking-widest mb-2">
            Final results
          </p>
          <h1 className="text-[18px] font-medium text-ink-1 leading-snug mb-2">
            {poll.title}
          </h1>
          <p className="text-[11px] text-ink-3 mb-7">
            {poll.totalResponses} responses ·{" "}
            {poll.isAnonymous ? "Anonymous" : "Authenticated"}
          </p>

          {/* Winner callout — highlighted box for the leading option */}
          <div className="mb-6 px-4 py-3 rounded-lg bg-green-dim border border-green-bar/25">
            <p className="text-[11px] text-ink-3 mb-0.5">Most voted</p>
            <p className="text-[15px] font-medium text-green-acc">
              {poll.options[leadingIdx].text}
            </p>
            <p className="text-[11px] text-ink-2 mt-0.5">
              {poll.options[leadingIdx].count} votes · {pcts[leadingIdx]}%
            </p>
          </div>

          {/* All options as read-only bars sorted by original display order */}
          <div className="space-y-3.5">
            {poll.options.map((opt, i) => (
              <AnalyticsBar
                key={opt.id}
                label={opt.text}
                count={opt.count}
                pct={pcts[i]}
                isLeading={i === leadingIdx}
              />
            ))}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar liveCount={isActive ? poll.totalResponses : undefined} />

      <main className="max-w-lg mx-auto px-4 py-10 animate-slide-up">
        <h1 className="text-[18px] font-medium text-ink-1 leading-snug mb-3">
          {poll.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-3 mb-7">
          {isActive && (
            <>
              <span className="flex items-center gap-1.5">
                <LiveDot />
                Live
              </span>
              {poll.expiresAt && <span>{countdown}</span>}
              <span>·</span>
            </>
          )}
          {isClosed && <span>Poll ended</span>}
          <span>{poll.isAnonymous ? "Anonymous" : "Sign-in required"}</span>
          <span>·</span>
          <span>Single choice</span>
        </div>

        {authBlocked && (
          <div className="mb-6 px-4 py-4 rounded-lg border border-white/8 bg-bg-2 text-center">
            <p className="text-[13px] text-ink-2 mb-3">
              This poll requires you to sign in to vote.
            </p>
            <Button
              variant="accent"
              size="sm"
              onClick={() => redirectToIrisLogin()}
            >
              Sign in to vote
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-2.5 mb-5">
          {poll.options.map((opt, i) => (
            <OptionBar
              key={opt.id}
              label={opt.text}
              pct={pcts[i]}
              hasVoted={showBars}
              isSelected={selected === i}
              disabled={!canVote}
              onClick={() => {
                if (canVote) setSelected(i === selected ? null : i);
              }}
            />
          ))}
        </div>

        {isActive && !hasVoted && !authBlocked && (
          <div className="flex flex-col gap-2">
            <Button
              variant="accent"
              className="w-full justify-center"
              disabled={selected === null || submitting}
              onClick={handleVote}
            >
              {submitting ? "Submitting…" : "Submit vote"}
            </Button>
            {error && (
              <p className="text-[12px] text-red-400 text-center">{error}</p>
            )}
          </div>
        )}

        {hasVoted && (
          <div className="mt-4 space-y-1 text-center">
            <p className="text-[12px] text-ink-3">Your vote is recorded</p>
            {isActive && poll.showLiveResults && (
              <p className="text-[11px] text-ink-3 flex items-center justify-center gap-1.5">
                <LiveDot />
                Results update live
              </p>
            )}
            <p className="text-[12px] text-ink-3 tabular-nums">
              {poll.totalResponses}{" "}
              {poll.totalResponses === 1 ? "response" : "responses"}
            </p>
          </div>
        )}

        {isClosed && !hasVoted && (
          <div className="mt-8 text-center">
            <p className="text-[14px] text-ink-2">This poll has ended</p>
            <p className="text-[12px] text-ink-3 mt-1">
              Results will appear here once the creator publishes them.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
