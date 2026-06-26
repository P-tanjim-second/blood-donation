// app/authorize.jsx
"use client";
import Link from "next/link";

export default function Authorize() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center
                    relative overflow-hidden px-5">

      {/* ── Dot grid ─────────────────────────────────────── */}
      <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />

      {/* ── Ambient blobs ────────────────────────────────── */}
      <div
        className="hero-blob absolute -top-32 -left-32 w-[480px] h-[480px]
                   opacity-[0.15] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 55% 55%, #c4612a 0%, #8b1a2f 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full
                   opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8b1a2f 0%, transparent 70%)",
        }}
      />

      {/* ── Ghost "401" ──────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="font-display font-bold select-none pointer-events-none
                   absolute text-charcoal/[0.04] leading-none"
        style={{ fontSize: "clamp(160px, 26vw, 340px)" }}
      >
        401
      </span>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative flex flex-col items-center text-center gap-7">

        {/* Lock icon */}
        <div className="relative hero-enter hero-enter-1">
          <span
            className="absolute inset-0 rounded-full bg-wine/10 animate-ping"
            style={{ animationDuration: "2.8s" }}
          />
          <div
            className="w-20 h-20 rounded-full bg-wine/8 border border-wine/20
                       flex items-center justify-center relative"
          >
            <svg
              width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#8b1a2f" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="eyebrow hero-enter hero-enter-1">Authentication Required</p>

        {/* Headline */}
        <h1
          className="font-display font-medium text-charcoal leading-[0.95]
                     hero-enter hero-enter-2"
          style={{ fontSize: "clamp(40px, 6.5vw, 76px)" }}
        >
          You Need to
          <br />
          <em className="text-wine not-italic">Sign In First.</em>
        </h1>

        {/* Body */}
        <p
          className="text-ash text-base leading-relaxed max-w-sm hero-enter hero-enter-3"
        >
          This page is only accessible to registered members. Log in to your
          Vitae account or create one — it&apos;s free.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center hero-enter hero-enter-4">
          <Link href="/login">
            <button
              className="px-7 py-3 rounded-full bg-wine text-white text-sm font-semibold
                         shadow-wine-sm hover:bg-wine-dark hover:-translate-y-0.5
                         transition-all duration-250 active:scale-95"
            >
              Sign In
            </button>
          </Link>
          <Link href="/register">
            <button
              className="px-7 py-3 rounded-full border border-wine/30 text-wine text-sm
                         font-semibold hover:bg-wine hover:text-white hover:border-wine
                         hover:-translate-y-0.5 transition-all duration-250 active:scale-95"
            >
              Create Account
            </button>
          </Link>
        </div>

        {/* Info strip */}
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-full border border-border
                     bg-surface/80 backdrop-blur-sm hero-enter hero-enter-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-wine/50 shrink-0" />
          <p className="text-xs text-ash">
            Already have an account?{" "}
            <Link href="/login"
              className="text-wine font-semibold hover:underline underline-offset-2">
              Sign in here →
            </Link>
          </p>
        </div>
      </div>

      {/* ── Bottom brand mark ─────────────────────────────── */}
      <div className="absolute bottom-8 flex items-center gap-2 opacity-40">
        <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
          <path
            d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09
               14 12.5C14 9 7 0 7 0Z"
            fill="#8b1a2f"
          />
        </svg>
        <span className="font-display text-sm font-semibold text-charcoal tracking-tight">
          Vitae
        </span>
      </div>
    </div>
  );
}