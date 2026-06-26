// app/not-found.jsx
"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center
                    relative overflow-hidden px-5">

      {/*Dot grid background */}
      <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />

      {/*Ambient blo*/}
      <div
        className="hero-blob absolute -top-24 -right-24 w-[520px] h-[520px]
                   opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #c4435a 0%, #8b1a2f 35%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full
                   opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8b1a2f 0%, transparent 70%)",
        }}
      />

      {/*Ghost "404 */}
      <span
        aria-hidden="true"
        className="font-display font-bold select-none pointer-events-none
                   absolute text-charcoal/[0.04] leading-none"
        style={{ fontSize: "clamp(180px, 28vw, 360px)" }}
      >
        404
      </span>

      {/*Main conten*/}
      <div className="relative flex flex-col items-center text-center gap-7
                      hero-enter hero-enter-2">

        {/* Animated blood drop */}
        <div className="relative">
          {/* Outer pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-wine/10 animate-ping"
            style={{ animationDuration: "2.4s" }}
          />
          <div
            className="w-20 h-20 rounded-full bg-wine/8 border border-wine/20
                       flex items-center justify-center relative"
          >
            <svg
              width="34" height="42" viewBox="0 0 14 18" fill="none"
              className="text-wine"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <path
                d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09
                   14 12.5C14 9 7 0 7 0Z"
                fill="currentColor"
              />
              {/* highlight */}
              <path
                d="M4 13.5C4 13.5 3 15 5 15.5"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="eyebrow hero-enter hero-enter-1">Error 404</p>

        {/* Headline */}
        <h1
          className="font-display font-medium text-charcoal leading-[0.95]
                     hero-enter hero-enter-2"
          style={{ fontSize: "clamp(42px, 7vw, 80px)" }}
        >
          Page Not{" "}
          <em className="text-wine not-italic">Found.</em>
        </h1>

        {/* Body */}
        <p
          className="text-ash text-base leading-relaxed max-w-sm
                     hero-enter hero-enter-3"
        >
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center hero-enter hero-enter-4">
          <Link href="/">
            <button
              className="px-7 py-3 rounded-full bg-wine text-white text-sm font-semibold
                         shadow-wine-sm hover:bg-wine-dark hover:-translate-y-0.5
                         transition-all duration-250 active:scale-95"
            >
              Back to Home
            </button>
          </Link>
          <Link href="/donation-requests">
            <button
              className="px-7 py-3 rounded-full border border-wine/30 text-wine text-sm
                         font-semibold hover:bg-wine hover:text-white hover:border-wine
                         hover:-translate-y-0.5 transition-all duration-250 active:scale-95"
            >
              View Requests
            </button>
          </Link>
        </div>

        {/* Divider + nav hint */}
        <div className="flex items-center gap-6 pt-2 hero-enter hero-enter-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-wine/30" />
            <Link
              href="/search"
              className="text-xs text-ash hover:text-wine transition-colors duration-150"
            >
              Find Donors
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-wine/30" />
            <Link
              href="/login"
              className="text-xs text-ash hover:text-wine transition-colors duration-150"
            >
              Sign In
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-wine/30" />
            <Link
              href="/register"
              className="text-xs text-ash hover:text-wine transition-colors duration-150"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/*Bottom brand mar*/}
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