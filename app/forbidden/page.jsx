// app/forbidden.jsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Forbidden() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center
                    relative overflow-hidden px-5">

      {/* ── Dot grid ─────────────────────────────────────── */}
      <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />

      {/* ── Ambient blobs ────────────────────────────────── */}
      <div
        className="hero-blob absolute -top-24 -right-24 w-[500px] h-[500px]
                   opacity-[0.13] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, #c4435a 0%, #6b1323 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full
                   opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8b1a2f 0%, transparent 70%)",
        }}
      />

      {/* ── Ghost "403" ──────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="font-display font-bold select-none pointer-events-none
                   absolute text-charcoal/[0.04] leading-none"
        style={{ fontSize: "clamp(160px, 26vw, 340px)" }}
      >
        403
      </span>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative flex flex-col items-center text-center gap-7">

        {/* Shield icon */}
        <div className="relative hero-enter hero-enter-1">
          {/* Static ring — no pulse, feels more "blocked" */}
          <div
            className="absolute inset-[-6px] rounded-full border-2
                       border-dashed border-wine/20 animate-spin-slow"
          />
          <div
            className="w-20 h-20 rounded-full bg-wine/8 border border-wine/20
                       flex items-center justify-center relative"
          >
            <svg
              width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#8b1a2f" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: "float 7s ease-in-out infinite" }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              {/* X mark inside shield */}
              <line x1="9" y1="9" x2="15" y2="15" strokeWidth="1.8" />
              <line x1="15" y1="9" x2="9" y2="15" strokeWidth="1.8" />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="eyebrow hero-enter hero-enter-1">Access Forbidden</p>

        {/* Headline */}
        <h1
          className="font-display font-medium text-charcoal leading-[0.95]
                     hero-enter hero-enter-2"
          style={{ fontSize: "clamp(40px, 6.5vw, 76px)" }}
        >
          You Don&apos;t Have
          <br />
          <em className="text-wine not-italic">Permission Here.</em>
        </h1>

        {/* Body */}
        <p
          className="text-ash text-base leading-relaxed max-w-sm hero-enter hero-enter-3"
        >
          Your account doesn&apos;t have the role required to view this page.
          If you believe this is a mistake, contact an administrator.
        </p>

        {/* Role hint card */}
        <div
          className="w-full max-w-sm rounded-2xl border border-border bg-white
                     divide-y divide-border overflow-hidden hero-enter hero-enter-4"
        >
          {[
            { userRole: "Admin", access: "Full platform access", color: "text-rose-600  bg-rose-50" },
            { userRole: "Volunteer", access: "Manage donation requests", color: "text-amber-600 bg-amber-50" },
            { userRole: "Donor", access: "Create & manage your requests", color: "text-blue-600  bg-blue-50" },
          ].map(({ userRole, access, color }) => (
            <div key={userRole} className="flex items-center justify-between px-5 py-3.5 gap-4">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg shrink-0 ${color}`}>
                {userRole}
              </span>
              <span className="text-xs text-ash text-right">{access}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center hero-enter hero-enter-5">
          <Link href="/">
            <button
              className="px-7 py-3 rounded-full bg-wine text-white text-sm font-semibold
                         shadow-wine-sm hover:bg-wine-dark hover:-translate-y-0.5
                         transition-all duration-250 active:scale-95"
            >
              Back to Home
            </button>
          </Link>
          <button
            onClick={() => router.back()}
            className="px-7 py-3 rounded-full border border-wine/30 text-wine text-sm
                       font-semibold hover:bg-wine hover:text-white hover:border-wine
                       hover:-translate-y-0.5 transition-all duration-250 active:scale-95"
          >
            Go Back
          </button>
        </div>

        {/* Bottom nav links */}
        <div className="flex items-center gap-6 pt-1 hero-enter hero-enter-5">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Sign In", href: "/login" },
            { label: "Contact Us", href: "/#contact" },
          ].map(({ label, href }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-wine/30" />
              <Link
                href={href}
                className="text-xs text-ash hover:text-wine transition-colors duration-150"
              >
                {label}
              </Link>
            </div>
          ))}
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