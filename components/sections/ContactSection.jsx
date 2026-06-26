"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { BLOOD_GROUPS, DISTRICTS } from "@/lib/mockData";

// Search CTA Section 
export function SearchCTASection() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (bloodGroup) params.set("bloodGroup", bloodGroup);
    if (district) params.set("district", district);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section ref={ref} className="bg-wine py-20 lg:py-28 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04] dot-bg pointer-events-none" />
      {/* Blob */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-8xl mx-auto px-5 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-mono tracking-widest uppercase text-ivory/40 mb-4 reveal" data-delay="1">
            Find a Donor
          </p>
          <h2
            className="font-display font-medium text-ivory reveal"
            data-delay="2"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            Find a Compatible
            <br />
            Donor Right Now
          </h2>
          <p className="text-ivory/60 mt-4 mb-10 text-base reveal" data-delay="3">
            Search by blood type and location to instantly find available donors near you.
          </p>

          {/* Quick search form */}
          <form
            onSubmit={handleSearch}
            className="reveal bg-ivory/10 backdrop-blur-sm border border-ivory/20
                       rounded-2xl p-5 flex flex-col sm:flex-row gap-3"
            data-delay="4"
          >
            <Select
              placeholder="Blood Group"
              size="md"
              className="flex-1"
              classNames={{
                trigger: "bg-ivory border-0 text-charcoal",
                value: "text-charcoal font-semibold",
              }}
              selectedKeys={bloodGroup ? [bloodGroup] : []}
              onSelectionChange={(keys) => setBloodGroup([...keys][0] || "")}
            >
              {BLOOD_GROUPS.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </Select>

            <Select
              placeholder="Select District"
              size="md"
              className="flex-1"
              classNames={{
                trigger: "bg-ivory border-0 text-charcoal",
                value: "text-charcoal",
              }}
              selectedKeys={district ? [district] : []}
              onSelectionChange={(keys) => setDistrict([...keys][0] || "")}
            >
              {DISTRICTS.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </Select>

            <Button
              type="submit"
              size="md"
              className="bg-charcoal text-ivory font-semibold px-7 rounded-xl
                         hover:bg-charcoal/80 transition-colors shrink-0"
            >
              Search
            </Button>
          </form>

          <p className="text-ivory/35 text-xs mt-4 reveal" data-delay="5">
            Or{" "}
            <Link href="/register" className="underline underline-offset-2 hover:text-ivory transition-colors">
              register as a donor
            </Link>{" "}
            to help others in need.
          </p>
        </div>
      </div>
    </section>
  );
}

// Contact Section─
export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to real contact API
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const CONTACTS = [
    { label: "Email", value: "support@vitaebd.org", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
    { label: "Phone", value: "+880 1700-000000", icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" },
    { label: "Location", value: "Dhaka, Bangladesh", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4z" },
  ];

  return (
    <section id="contact" ref={ref} className="bg-ivory py-24 lg:py-32">
      <div className="max-w-8xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4 reveal" data-delay="1">Contact Us</p>
            <h2
              className="font-display font-medium text-charcoal mb-5 reveal"
              data-delay="2"
              style={{ fontSize: "clamp(34px, 4.5vw, 52px)" }}
            >
              Get in Touch
            </h2>
            <p className="text-ash text-base leading-relaxed mb-10 max-w-sm reveal" data-delay="3">
              Have questions, partnership inquiries, or need emergency help? 
              Reach out and we will respond within 24 hours.
            </p>

            <div className="space-y-5">
              {CONTACTS.map((c) => (
                <div key={c.label} className="reveal flex items-start gap-4" data-delay="4">
                  <div className="w-10 h-10 rounded-xl bg-wine/8 flex items-center justify-center text-wine shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={c.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-ash">{c.label}</p>
                    <p className="text-sm font-semibold text-charcoal mt-0.5">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7 reveal" data-delay="3">
            <div className="bg-surface border border-border rounded-2xl p-8 shadow-card">
              {sent && (
                <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                  ✓ Message sent! We will get back to you shortly.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input
                      required
                      className="form-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-wine text-white font-semibold rounded-xl
                             hover:bg-wine-dark transition-colors shadow-wine-sm"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
