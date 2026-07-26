// app/unauthorized/page.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center relative overflow-hidden px-5">

      {/* ── Dot grid ─────────────────────────────────────── */}
      <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />

      {/* ── Ambient blobs ────────────────────────────────── */}
      <div
        className="hero-blob absolute -top-32 -left-32 w-[480px] h-[480px] opacity-[0.15] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 55% 55%, #c4612a 0%, #8b1a2f 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8b1a2f 0%, transparent 70%)",
        }}
      />

      {/* ── Ghost "403" ──────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="font-display font-bold select-none pointer-events-none absolute text-charcoal/[0.04] leading-none"
        style={{ fontSize: "clamp(160px, 26vw, 340px)" }}
      >
        403
      </span>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative flex flex-col items-center text-center gap-7 max-w-md">

        {/* Shield/Lock icon */}
        <div className="relative hero-enter hero-enter-1">
          <span
            className="absolute inset-0 rounded-full bg-wine/10 animate-ping"
            style={{ animationDuration: "2.8s" }}
          />
          <div className="w-20 h-20 rounded-full bg-wine/8 border border-wine/20 flex items-center justify-center relative">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8b1a2f"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <rect x="9" y="11" width="6" height="5" rx="1" />
              <path d="M10 11V9a2 2 0 014 0v2" />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="eyebrow hero-enter hero-enter-1">Access Restricted</p>

        {/* Headline */}
        <h1
          className="font-display font-medium text-charcoal leading-[0.95] hero-enter hero-enter-2"
          style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
        >
          Permission
          <br />
          <em className="text-wine not-italic">Required.</em>
        </h1>

        {/* Body */}
        <p className="text-ash text-base leading-relaxed hero-enter hero-enter-3">
          You don&apos;t have the necessary clearance to view this page. If you believe this is a mistake, request access or switch to an authorized account.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center hero-enter hero-enter-4">
          <button
            onClick={() => router.back()}
            className="px-7 py-3 rounded-full border border-wine/30 text-wine text-sm font-semibold hover:bg-wine hover:text-white hover:border-wine hover:-translate-y-0.5 transition-all duration-250 active:scale-95"
          >
            Go Back
          </button>
          
          <Link href="/dashboard">
            <button className="px-7 py-3 rounded-full bg-wine text-white text-sm font-semibold shadow-wine-sm hover:bg-wine-dark hover:-translate-y-0.5 transition-all duration-250 active:scale-95">
              Return Home
            </button>
          </Link>
        </div>

        {/* Info strip */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-white/80 backdrop-blur-sm hero-enter hero-enter-5">
          <span className="w-1.5 h-1.5 rounded-full bg-wine/50 shrink-0" />
          <p className="text-xs text-ash">
            Need access?{" "}
            <Link
              href="/support"
              className="text-wine font-semibold hover:underline underline-offset-2"
            >
              Contact Support →
            </Link>
          </p>
        </div>
      </div>

      {/* ── Bottom brand mark ─────────────────────────────── */}
      <div className="absolute bottom-8 flex items-center gap-2 opacity-40">
        <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
          <path
            d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z"
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