"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { getAllRequests } from "@/lib/api/server/action";



const BG_COLORS = {
  "A+": "bg-red-50 text-red-700 border-red-200",
  "A-": "bg-rose-50 text-rose-700 border-rose-200",
  "B+": "bg-orange-50 text-orange-700 border-orange-200",
  "B-": "bg-amber-50 text-amber-700 border-amber-200",
  "AB+": "bg-purple-50 text-purple-700 border-purple-200",
  "AB-": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  "O+": "bg-blue-50 text-blue-700 border-blue-200",
  "O-": "bg-sky-50 text-sky-700 border-sky-200",
};

function RequestCard({ req, index }) {

  return (
    <div
      className="reveal hover-lift bg-white rounded-2xl border border-border p-6 flex flex-col gap-4"
      data-delay={String(index + 1)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-ash mb-1 font-mono">Recipient</p>
          <p className="font-semibold text-charcoal text-base leading-tight">{req.recipientName}</p>
        </div>
        {/* Blood group badge */}
        <div className={`shrink-0 px-3 py-1.5 rounded-xl border font-mono font-semibold text-base
                         ${BG_COLORS[req.bloodGroup] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
          {req.bloodGroup}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        {[
          {
            icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
            text: `${req.recipientDistrict}, ${req.recipientUpazila}`,
          },
          {
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h2m4 0h2m-8 4h2m4 0h2M9 7h6",
            text: req.hospitalName,
          },
          {
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            text: `${req.donationDate} at ${req.donationTime}`,
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <svg
              className="text-ash shrink-0 mt-0.5"
              width="13" height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.icon} />
            </svg>
            <p className="text-xs text-ash leading-snug line-clamp-2">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Message excerpt */}
      <p className="text-xs text-ash/70 leading-relaxed line-clamp-2 italic border-t border-border pt-3">
        "{req.requestMessage}"
      </p>

      {/* CTA */}
      <Link href={`/donation-requests/${req._id}`} className="mt-auto">
        <Button
          size="sm"
          className="w-full bg-wine text-white rounded-xl font-semibold
                     hover:bg-wine-dark transition-colors"
        >
          View & Donate
        </Button>
      </Link>
    </div>
  );
}

export default function UrgentRequestsSection() {
  const ref = useRef(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      const requests = await getAllRequests("pending", 1, 3);
      setRequests(requests.requests);
      setLoading(false);
    }
    func();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
      },
      { threshold: 0.08 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [requests]);

  return (
    <section ref={ref} className="bg-cream py-24 lg:py-32">
      <div className="max-w-8xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <p className="eyebrow mb-3 reveal" data-delay="1">Urgent Needs</p>
            <h2
              className="font-display font-medium text-charcoal reveal"
              data-delay="2"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Active Requests
              <br />
              <em className="text-wine not-italic">Near You</em>
            </h2>
          </div>
          <Link href="/donation-requests" className="reveal shrink-0" data-delay="3">
            <Button
              variant="bordered"
              className="border-wine/30 text-wine font-semibold rounded-full
                         hover:bg-wine hover:text-white hover:border-wine transition-all"
            >
              View All Requests
            </Button>
          </Link>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-parchment animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {requests.map((req, i) => (
              <RequestCard key={req._id} req={req} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
