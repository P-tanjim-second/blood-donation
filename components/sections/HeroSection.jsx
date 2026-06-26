"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

const BLOOD_TYPES = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

const MINI_STATS = [
  { value: "2,847", label: "Active Donors" },
  { value: "1,203", label: "Lives Saved" },
  { value: "64", label: "Districts" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-ivory" />;

  return (
    <section className="relative min-h-screen bg-ivory overflow-hidden flex items-center">
      {/* Backgrounds */}
      {/* Dot grid */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

      {/* Warm gradient blob top-right */}
      <div
        className="hero-blob absolute -top-32 -right-32 w-[640px] h-[640px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #c4435a 0%, #8b1a2f 35%, transparent 70%)",
        }}
      />

      {/* Subtle bottom-left accent */}
      <div
        className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #f0ede8 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-8xl mx-auto px-5 lg:px-10 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left: Text  */}
          <div className="lg:col-span-7 space-y-7">


            {/* Headline */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium text-charcoal leading-[0.88]"
                style={{ fontSize: "clamp(68px, 9.5vw, 120px)" }}
              >
                Give
                <em className="text-wine not-italic"> Life,</em>
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium text-charcoal leading-[0.88] mt-1"
                style={{ fontSize: "clamp(68px, 9.5vw, 120px)" }}
              >
                Save
                <em className="text-wine not-italic"> Stories.</em>
              </motion.h1>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-ash leading-relaxed max-w-[480px]"
            >
              Every drop of blood carries the weight of a life. Connect with
              verified donors across Bangladesh and become the reason someone
              writes another chapter.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-wine text-white font-semibold px-7 rounded-full
                             hover:bg-wine-dark transition-all duration-250 shadow-wine-sm
                             hover:-translate-y-0.5"
                >
                  Become a Donor
                </Button>
              </Link>
              <Link href="/search">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-wine/35 text-wine font-semibold px-7 rounded-full
                             hover:bg-wine hover:text-white hover:border-wine
                             transition-all duration-250 hover:-translate-y-0.5"
                >
                  Find Donors
                </Button>
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.68 }}
              className="flex gap-8 pt-5 border-t border-border"
            >
              {MINI_STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-2xl font-semibold text-wine">{s.value}</p>
                  <p className="text-xs text-ash mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Blood type grid */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[380px]"
            >
              {/* Header label */}
              <div className="mb-4 flex items-center justify-between">
                <p className="eyebrow">All blood types covered</p>
                <span className="w-6 h-px bg-border" />
              </div>

              {/* 4 × 2 grid */}
              <div className="grid grid-cols-4 gap-2.5">
                {BLOOD_TYPES.map((type, i) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="blood-type-card group"
                  >
                    <div
                      className="aspect-square flex flex-col items-center justify-center
                                 border border-border rounded-xl bg-white cursor-default"
                    >
                      <span
                        className="bt-label font-display text-2xl font-semibold text-wine
                                   leading-none"
                      >
                        {type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Info strip */}
              <div className="mt-4 p-3.5 rounded-xl border border-border bg-cream/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ash">
                    <span className="font-mono font-semibold text-wine">O−</span>
                    {" "}Universal Donor
                  </span>
                  <span className="w-px h-4 bg-border" />
                  <span className="text-ash">
                    <span className="font-mono font-semibold text-wine">AB+</span>
                    {" "}Universal Recipient
                  </span>
                </div>
              </div>

              {/* Scroll hint */}
              <div className="mt-6 flex items-center gap-2 justify-end">
                <span className="text-xs text-ash/60">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className="text-ash/50">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
