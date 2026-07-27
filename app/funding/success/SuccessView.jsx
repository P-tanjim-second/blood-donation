"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Confetti ───────────────────────────────────────────────────────────────
const COLORS = ["#8B1A2F", "#C4435A", "#C4612A", "#F9F8F6", "#E8E3DB", "#0F0F0F"];

function useConfetti(active) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x:     Math.random() * canvas.width,
      y:     -20 - Math.random() * 80,
      r:     Math.random() * 6 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 2.5 + 1.2,
      drift: (Math.random() - 0.5) * 1.5,
      spin:  (Math.random() - 0.5) * 0.15,
      angle: Math.random() * Math.PI * 2,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let raf;
    let frame = 0;

    function draw() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y     += p.speed;
        p.x     += p.drift;
        p.angle += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle   = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
        if (p.shape === "rect") {
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      if (frame < 320) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  return canvasRef;
}

// ── Animated SVG check ─────────────────────────────────────────────────────
function AnimatedCheck() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle
        cx="26" cy="26" r="25"
        stroke="#16a34a" strokeWidth="2"
        strokeDasharray="157" strokeDashoffset="157"
        style={{ animation: "drawCircle 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards" }}
      />
      <polyline
        points="14,27 23,36 38,18"
        stroke="#16a34a" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="36" strokeDashoffset="36"
        style={{ animation: "drawCheck 0.4s cubic-bezier(0.16,1,0.3,1) 0.7s forwards" }}
      />
      <style>{`
        @keyframes drawCircle { to { stroke-dashoffset: 0; } }
        @keyframes drawCheck  { to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  );
}

// ── Detail row ─────────────────────────────────────────────────────────────
function DetailRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-ash shrink-0">{label}</span>
      {children}
    </div>
  );
}

// ── Failed state ───────────────────────────────────────────────────────────
function FailedView({ paymentIntent }) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center
                    justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

      <div className="relative flex flex-col items-center text-center gap-6
                      max-w-sm w-full">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 border border-red-200
                        flex items-center justify-center hero-enter hero-enter-1">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9"  y2="15" />
            <line x1="9"  y1="9" x2="15" y2="15" />
          </svg>
        </div>

        {/* Text */}
        <div className="hero-enter hero-enter-2">
          <p className="eyebrow mb-2" style={{ color: "#dc2626" }}>
            Payment Failed
          </p>
          <h1
            className="font-display font-medium text-charcoal"
            style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
          >
            Something went wrong.
          </h1>
          <p className="text-ash text-sm mt-3 leading-relaxed">
            Your payment could not be processed. No charge was made.
            Please try again or use a different payment method.
          </p>
        </div>

        {/* Reference */}
        {paymentIntent && (
          <div className="w-full p-4 rounded-xl bg-surface border border-border
                          text-left hero-enter hero-enter-3">
            <p className="text-xs text-ash mb-1">Payment Reference</p>
            <p className="text-xs font-mono text-charcoal break-all">
              {paymentIntent}
            </p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full hero-enter hero-enter-4">
          <Link href="/funding" className="flex-1">
            <button className="w-full px-6 py-3 rounded-full bg-wine text-white
                               text-sm font-semibold hover:bg-wine-dark
                               transition-all duration-200 shadow-wine-sm
                               hover:-translate-y-0.5 active:scale-95">
              Try Again
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button className="w-full px-6 py-3 rounded-full border border-border
                               text-slate text-sm font-semibold hover:bg-cream
                               transition-all duration-200 hover:-translate-y-0.5
                               active:scale-95">
              Back to Home
            </button>
          </Link>
        </div>
      </div>

      {/* Brand */}
      <div className="absolute bottom-8 flex items-center gap-2 opacity-40">
        <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
          <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18
                   14 16.09 14 12.5C14 9 7 0 7 0Z" fill="#8b1a2f" />
        </svg>
        <span className="font-display text-sm font-semibold text-charcoal">
          Vitae
        </span>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export default function SuccessView({ paymentIntent, redirectStatus, amount, date }) {
  const [mounted, setMounted] = useState(false);
  const isSuccess = redirectStatus === "succeeded";
  const canvasRef = useConfetti(mounted && isSuccess);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!isSuccess) {
    return <FailedView paymentIntent={paymentIntent} />;
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center
                    justify-center px-5 relative overflow-hidden">

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        aria-hidden="true"
      />

      {/* Backgrounds */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
      <div
        className="hero-blob absolute -top-24 -right-24 w-[440px] h-[440px]
                   opacity-[0.12] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, #16a34a 0%, #15803d 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full
                   opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b1a2f 0%, transparent 70%)" }}
      />

      <div className="relative flex flex-col items-center text-center gap-8
                      max-w-md w-full">

        {/* Animated check */}
        <div className="relative hero-enter hero-enter-1">
          <span
            className="absolute inset-[-10px] rounded-full bg-green-500/10 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <span className="absolute inset-[-4px] rounded-full bg-green-500/10" />
          <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200
                          flex items-center justify-center relative">
            {mounted && <AnimatedCheck />}
          </div>
        </div>

        {/* Eyebrow */}
        <p className="eyebrow hero-enter hero-enter-1" style={{ color: "#15803d" }}>
          Payment Confirmed
        </p>

        {/* Headline */}
        <h1
          className="font-display font-medium text-charcoal leading-[0.95]
                     hero-enter hero-enter-2"
          style={{ fontSize: "clamp(42px, 7vw, 72px)" }}
        >
          Thank You for
          <br />
          <em className="text-wine not-italic">Your Generosity.</em>
        </h1>

        {/* Body */}
        <p className="text-ash text-base leading-relaxed hero-enter hero-enter-3">
          Your contribution helps keep Vitae free and operational for everyone
          across Bangladesh. Lives are saved because of people like you.
        </p>

        {/* Summary card */}
        <div
          className="w-full bg-surface border border-border rounded-2xl
                     overflow-hidden hero-enter hero-enter-4"
        >
          {/* Card header */}
          <div className="bg-green-50 border-b border-green-100 px-6 py-4
                          flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center
                            justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-green-800">
              Payment Successful
            </p>
          </div>

          {/* Details */}
          <div className="px-6 py-5 space-y-4">
            {/* Amount — only shown if passed via URL */}
            {amount && (
              <div className="flex items-center justify-between py-3
                              border-b border-border">
                <span className="text-sm text-ash">Amount Paid</span>
                <span className="font-mono font-bold text-2xl text-wine">
                  ৳{amount.toLocaleString()}
                </span>
              </div>
            )}

            <DetailRow label="Status">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                               text-green-700 bg-green-50 px-2.5 py-1 rounded-full
                               border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Confirmed
              </span>
            </DetailRow>

            <DetailRow label="Platform">
              <span className="text-sm font-medium text-charcoal flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Stripe
              </span>
            </DetailRow>

            {paymentIntent && (
              <DetailRow label="Reference">
                <span className="text-xs font-mono text-ash break-all text-right max-w-[200px]">
                  {paymentIntent}
                </span>
              </DetailRow>
            )}

            {/* Date comes from server — no hydration mismatch */}
            <DetailRow label="Date">
              <span className="text-sm text-charcoal font-medium">{date}</span>
            </DetailRow>
          </div>

          {/* Perforated divider */}
          <div className="relative px-6">
            <div className="h-px bg-border" />
            <div className="absolute left-0  top-1/2 -translate-y-1/2 w-5 h-5
                            rounded-full bg-cream border-r border-border" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5
                            rounded-full bg-cream border-l border-border" />
          </div>

          {/* Quote */}
          <div className="px-6 py-5">
            <p className="text-xs text-ash text-center leading-relaxed italic">
              "A single act of generosity can ripple into countless lives saved."
              <span className="not-italic font-mono text-wine/60 mt-1 block">
                — The Vitae Team
              </span>
            </p>
          </div>
        </div>

        {/* Impact note */}
        <div className="w-full flex items-center gap-4 p-4 rounded-2xl
                        bg-wine/5 border border-wine/15 hero-enter hero-enter-5">
          <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center
                          justify-center shrink-0">
            <svg width="18" height="22" viewBox="0 0 14 18" fill="none">
              <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18
                       14 16.09 14 12.5C14 9 7 0 7 0Z" fill="#8B1A2F" />
            </svg>
          </div>
          <p className="text-xs text-ash leading-relaxed text-left">
            Your fund helps us maintain servers, verify donors, and respond
            to emergency requests 24/7 across all 64 districts.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full hero-enter hero-enter-5">
          <Link href="/funding" className="flex-1">
            <button className="w-full px-6 py-3.5 rounded-full bg-wine text-white
                               text-sm font-semibold hover:bg-wine-dark
                               transition-all duration-200 shadow-wine-sm
                               hover:-translate-y-0.5 active:scale-95">
              View All Contributions
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button className="w-full px-6 py-3.5 rounded-full border border-wine/25
                               text-wine text-sm font-semibold
                               hover:bg-wine hover:text-white hover:border-wine
                               transition-all duration-200
                               hover:-translate-y-0.5 active:scale-95">
              Back to Home
            </button>
          </Link>
        </div>
      </div>

      {/* Brand mark */}
      <div className="absolute bottom-8 flex items-center gap-2 opacity-35">
        <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
          <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18
                   14 16.09 14 12.5C14 9 7 0 7 0Z" fill="#8b1a2f" />
        </svg>
        <span className="font-display text-sm font-semibold text-charcoal tracking-tight">
          Vitae
        </span>
      </div>
    </div>
  );
}