"use client";
import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Verified Donors",
    desc: "Every donor goes through a verification process. Blood group, health status, and identity are confirmed before listing.",
    tag: "Trust & Safety",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Instant Matching",
    desc: "Post a blood request and get matched with compatible donors in your district within minutes. Time is everything.",
    tag: "Speed",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Fully Free",
    desc: "Zero cost for donors and recipients. This platform exists purely to save lives — no subscriptions, no hidden fees.",
    tag: "Zero Cost",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "All 64 Districts",
    desc: "Coverage across every district of Bangladesh — from Dhaka to Rangamati, from Sylhet to Khulna.",
    tag: "Nationwide",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-cream py-24 lg:py-32">
      <div className="max-w-8xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-4 reveal" data-delay="1">Why Choose Vitae</p>
            <h2
              className="font-display font-medium text-charcoal leading-[1.0] reveal"
              data-delay="2"
              style={{ fontSize: "clamp(38px, 5vw, 60px)" }}
            >
              Every 2 Seconds,
              <br />
              <em className="text-wine not-italic">Someone Needs Blood.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-base text-ash leading-relaxed max-w-md reveal" data-delay="3">
              Blood cannot be manufactured. It can only come from people who choose
              to give. Vitae makes that connection frictionless, fast, and trustworthy.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="reveal hover-lift group bg-white rounded-2xl p-7 border border-border
                         cursor-default"
              data-delay={String(i + 1)}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-wine/8 flex items-center justify-center
                              text-wine mb-5 group-hover:bg-wine group-hover:text-white
                              transition-all duration-250">
                {f.icon}
              </div>

              {/* Tag */}
              <span className="eyebrow text-[10px] text-wine/70 mb-2 block">{f.tag}</span>

              {/* Title */}
              <h3 className="font-sans font-semibold text-charcoal text-base mb-2">
                {f.title}
              </h3>

              {/* Desc */}
              <p className="text-sm text-ash leading-relaxed">{f.desc}</p>

              {/* Hover arrow */}
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-wine
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Learn more</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
