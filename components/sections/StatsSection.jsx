"use client";
import { useState, useEffect, useRef } from "react";

const STATS = [
  { target: 2847, suffix: "+", label: "Active Donors", sub: "Across Bangladesh" },
  { target: 1203, suffix: "+", label: "Lives Saved", sub: "Since 2022" },
  { target: 64, suffix: "", label: "Districts", sub: "Full coverage" },
  { target: 98, suffix: "%", label: "Verified Donors", sub: "Background checked" },
];

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target]);

  return (
    <span className="stat-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-wine py-14">
      {/* Marquee of blood types above stats */}
      <div className="overflow-hidden mb-10 border-b border-wine-light/30">
        <div className="marquee-track py-2">
          {Array.from({ length: 6 }, (_, i) =>
            ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"].map((t) => (
              <span
                key={`${i}-${t}`}
                className="font-display text-sm font-medium text-ivory/20 mx-8 shrink-0"
              >
                {t}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center lg:text-left lg:border-r border-ivory/15 last:border-0 lg:px-6 first:pl-0"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="text-5xl lg:text-[56px] font-mono font-semibold text-ivory leading-none">
                <CountUp target={stat.target} suffix={stat.suffix} active={visible} />
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-ivory/80">{stat.label}</p>
                <p className="text-xs text-ivory/40 mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
