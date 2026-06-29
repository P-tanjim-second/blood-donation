"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Pagination } from "@heroui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllRequests } from "@/lib/api/server/action";

const BG_COLORS = {
  "A+": "bg-red-50   text-red-700   border-red-200",
  "A-": "bg-rose-50  text-rose-700  border-rose-200",
  "B+": "bg-orange-50 text-orange-700 border-orange-200",
  "B-": "bg-amber-50 text-amber-700 border-amber-200",
  "AB+": "bg-purple-50 text-purple-700 border-purple-200",
  "AB-": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  "O+": "bg-blue-50   text-blue-700   border-blue-200",
  "O-": "bg-sky-50    text-sky-700    border-sky-200",
};


function formatTo12Hour(timeStr) {
  if (!timeStr) return "";

  // Splits "14:30:00" or "14:30" into hours and minutes
  const [hoursStr, minutesStr] = timeStr.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr;

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${hours}:${minutes} ${ampm}`;
}

function RequestCard({ req }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 hover-lift">
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-ash font-mono mb-0.5">Recipient</p>
          <p className="font-semibold text-charcoal">{req.recipientName}</p>
        </div>
        <span
          className={`shrink-0 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm
                      ${BG_COLORS[req.bloodGroup] || "bg-gray-50 text-gray-700 border-gray-200"}`}
        >
          {req.bloodGroup}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2">
        {[
          {
            icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4z",
            text: `${req.recipientDistrict}, ${req.recipientUpazila}`,
          },
          {
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3",
            text: req.hospitalName,
          },
          {
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            text: `${req.donationDate}  ·  ${formatTo12Hour(req.donationTime)}`,
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <svg className="shrink-0 mt-0.5 text-ash" width="13" height="13"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            <p className="text-xs text-ash leading-snug">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Message */}
      <p className="text-xs text-ash/70 italic leading-relaxed line-clamp-2 pt-3 border-t border-border">
        "{req.requestMessage}"
      </p>

      {/* CTA */}
      <Link href={`/donation-requests/${req._id}`} className="mt-auto">
        <Button
          size="sm"
          className="w-full bg-wine text-white font-semibold rounded-xl
                     hover:bg-wine-dark transition-colors"
        >
          View Details & Donate
        </Button>
      </Link>
    </div>
  );
}

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function getRequests() {
      setLoading(true);
      try {
        const response = await getAllRequests("pending", currentPage, itemsPerPage);

        setRequests(response.requests || []);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      } finally {
        setLoading(false);
      }
    }
    getRequests();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pt-16">
        {/* Hero bar */}
        <div className="bg-cream border-b border-border py-14">
          <div className="max-w-8xl mx-auto px-5 lg:px-10">
            <p className="eyebrow mb-3">Open Requests</p>
            <h1
              className="font-display font-medium text-charcoal"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Pending Donation
              <em className="text-wine not-italic"> Requests</em>
            </h1>
            <p className="text-ash text-base mt-3 max-w-xl">
              These recipients are actively waiting for blood. Log in to respond
              and potentially save a life today.
            </p>
          </div>
        </div>

        {/* Grid and Pagination Layout */}
        <div className="max-w-8xl mx-auto px-5 lg:px-10 py-12 flex flex-col gap-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-72 rounded-2xl bg-cream animate-pulse" />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ash text-sm">No pending requests at this time.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {requests.map((req) => (
                  <RequestCard key={req._id} req={req} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center pt-6">
                  <Pagination
                    isCompact
                    showControls
                    color="danger"
                    total={totalPages}
                    initialPage={1}
                    page={currentPage}
                    onChange={handlePageChange}
                    classNames={{
                      wrapper: "gap-1",
                      item: "text-charcoal bg-white  font-medium",
                      cursor: "bg-wine text-white font-semibold",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}