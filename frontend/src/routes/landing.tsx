import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/Button";
import { LiveDot } from "#/components/poll/LiveDot";
import { redirectToIrisLogin } from "#/services/auth";

export const Route = createFileRoute("/landing")({
  component: LandingPage,
});

function LandingPage() {
  const [votes, setVotes] = useState(247);
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0]);
  const [barLabels, setBarLabels] = useState(["", "", "", ""]);

  useEffect(() => {
    // Reveal Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Hero Bar Animation
    const targets = [52, 28, 12, 8];
    const labels = ["52%", "28%", "12%", "8%"];

    const timer = setTimeout(() => {
      setBarWidths(targets);
      setTimeout(() => setBarLabels(labels), 800);
    }, 600);

    // Simulated Counter
    const counter = setInterval(() => {
      setVotes((v) => v + Math.floor(Math.random() * 3));
    }, 2200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearInterval(counter);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#efefed] selection:bg-green-500/30 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-[1200px] mx-auto">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded-sm rotate-12" />
          Pulse
        </div>
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" onClick={redirectToIrisLogin}>
            Sign in
          </Button>
          <Button variant="accent" size="sm" onClick={redirectToIrisLogin}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="reveal opacity-0 translate-y-4 transition-all duration-700">
            <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight mb-6">
              Real-time{" "}
              <span className="text-green-400 italic font-serif">polling</span>{" "}
              for high-stakes teams.
            </h1>
            <p className="text-lg text-[#888884] max-w-md leading-relaxed">
              Capture instant feedback, visualize decisions, and move faster
              with Pulse's ultra-low latency infrastructure.
            </p>
          </div>

          <div className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-200 flex gap-4">
            <Button variant="accent" size="md" className="h-12 px-8 text-base">
              Create a Poll
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="h-12 px-8 text-base border-white/10"
            >
              View Demo
            </Button>
          </div>

          <div className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-300 flex items-center gap-3 pt-4">
            <LiveDot />
            <span
              className="text-sm font-mono text-[#444440]"
              id="vote-counter"
            >
              {votes.toLocaleString()} responses
            </span>
          </div>
        </div>

        {/* Hero Interactive Card */}
        <div className="reveal opacity-0 translate-y-4 transition-all duration-1000 delay-300 bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Should we push the v2.4 update today?
            </h3>
            <p className="text-sm text-[#444440] font-mono tracking-widest uppercase">
              Ongoing Team Poll
            </p>
          </div>

          <div className="space-y-4">
            {["Ship it", "Need more QA", "Wait until Monday", "Abort"].map(
              (label, i) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between text-sm font-mono text-[#888884]">
                    <span>{label}</span>
                    <span className="transition-opacity duration-500">
                      {barLabels[i]}
                    </span>
                  </div>
                  <div className="h-10 w-full bg-[#181818] rounded-lg overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-green-500/20 border-r-2 border-green-400 transition-all duration-[1.2s] ease-out"
                      style={{ width: `${barWidths[i]}%` }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-40 grid md:grid-cols-3 gap-6">
        <div className="reveal opacity-0 translate-y-4 transition-all duration-700 md:col-span-2 bg-[#111111] rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors">
          <h4 className="text-lg font-bold mb-4">Ultra-low Latency</h4>
          <p className="text-[#888884] leading-relaxed">
            Engineered on top of WebSockets and high-performance edge clusters.
            See results update across continents in under 150ms.
          </p>
          <div className="mt-8 flex gap-1 items-end h-16">
            {[30, 45, 25, 60, 80, 45, 90, 55, 40].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-green-500/40 rounded-t-sm transition-all duration-1000 delay-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-green-400 rounded-2xl p-8 flex flex-col justify-between group cursor-default">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M5 10L8 13L15 6" />
            </svg>
          </div>
          <div>
            <h4 className="text-black text-xl font-bold mb-2 leading-tight">
              Verified & Anonymous
            </h4>
            <p className="text-black/70 text-sm">
              Cryptographically secure voting that ensures one-vote-per-user
              while maintaining total privacy.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-[#444440]">
          <div className="flex items-center gap-2 font-bold text-[#efefed]">
            <div className="w-4 h-4 bg-green-500 rounded-sm" />
            Pulse
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
          <p>© 2024 Pulse Technologies Inc.</p>
        </div>
      </footer>
    </div>
  );
}
