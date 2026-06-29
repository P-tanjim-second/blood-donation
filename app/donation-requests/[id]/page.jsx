"use client";
import { useState, useEffect } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Chip,
} from "@heroui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUser } from "@/lib/api/user/user";
import { getRequestById } from "@/lib/api/server/action";
import { updateRequest } from "@/lib/api/server/mutation";
import toast from "react-hot-toast";

const BG_COLORS = {
  "A+": "bg-red-50 text-red-700", "B+": "bg-orange-50 text-orange-700",
  "AB+": "bg-purple-50 text-purple-700", "O+": "bg-blue-50 text-blue-700",
  "A-": "bg-rose-50 text-rose-700", "B-": "bg-amber-50 text-amber-700",
  "AB-": "bg-fuchsia-50 text-fuchsia-700", "O-": "bg-sky-50 text-sky-700",
};

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-3.5 border-b border-border last:border-0">
      <dt className="w-44 shrink-0 text-xs font-semibold text-ash uppercase tracking-wider">{label}</dt>
      <dd className="text-sm text-charcoal font-medium">{value}</dd>
    </div>
  );
}

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

export default function RequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [req, setReq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    async function initializePage() {
      setLoading(true);
      try {
        const session = await getUser();
        if (!session?.user) {
          router.replace(`/login?redirect=/donation-requests/${id}`);
          return;
        }

        setUser(session.user);

        // 2. Request fetching: Only executes if user session validation passes
        const res = await getRequestById(id);
        if (res?.request) {
          setReq(res.request);
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    }
    initializePage();
  }, [id, router]);



  const handleDonate = async () => {
    setDonating(true);
    const res = await updateRequest(req._id, {
      donorName: user.name,
      donorEmail: user.email,
      status: 'inprogress'
    });
    if (res.status == 200) {
      toast.success("Thank you for your donation!");
    }
    else {
      toast.error("Failed to update request!");
    }
    setReq((r) => ({
      ...r,
      status: "inprogress",
      donorName: user.name,
      donorEmail: user.email,
    }));
    setDonating(false);
    setDonated(true);
    onClose();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-ivory pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-5">
            <div className="h-96 rounded-2xl bg-cream animate-pulse" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!req) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-ivory pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-ash text-lg">Request not found.</p>
            <Link href="/donation-requests" className="text-wine font-semibold text-sm mt-3 block">
              ← Back to requests
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const bgColor = BG_COLORS[req.bloodGroup] || "bg-gray-50 text-gray-700";
  const canDonate = req.status === "pending" && !donated;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pt-16 pb-16">
        {/* Breadcrumb */}
        <div className="bg-cream border-b border-border py-4">
          <div className="max-w-4xl mx-auto px-5 lg:px-10 flex items-center gap-2 text-sm text-ash">
            <Link href="/donation-requests" className="hover:text-wine transition-colors">
              Requests
            </Link>
            <span>/</span>
            <span className="text-charcoal font-medium truncate">{req.recipientName}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-5 lg:px-10 py-10">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main card */}
            <div className="lg:col-span-2 space-y-5">
              {/* Header */}
              <div className="bg-white border border-border rounded-2xl p-7">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="eyebrow mb-2">Blood Donation Request</p>
                    <h1 className="font-display font-medium text-charcoal"
                      style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}>
                      {req.recipientName}
                    </h1>
                  </div>
                  <div className={`shrink-0 px-4 py-2 rounded-xl font-mono font-bold text-2xl ${bgColor}`}>
                    {req.bloodGroup}
                  </div>
                </div>

                {donated && (
                  <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                    ✓ You have confirmed your donation. Thank you for giving life!
                  </div>
                )}

                <dl>
                  <DetailRow label="Requested by" value={`${req.requesterName} (${req.requesterEmail})`} />
                  <DetailRow label="Hospital" value={req.hospitalName} />
                  <DetailRow label="Full Address" value={req.fullAddress} />
                  <DetailRow label="Location" value={`${req.recipientDistrict}, ${req.recipientUpazila}`} />
                  <DetailRow label="Date & Time" value={`${req.donationDate} at ${formatTo12Hour(req.donationTime)}`} />
                  <DetailRow label="Blood Group" value={req.bloodGroup} />
                </dl>
              </div>

              {/* Message */}
              <div className="bg-white border border-border rounded-2xl p-7">
                <h2 className="font-semibold text-charcoal mb-3 text-sm uppercase tracking-wider">
                  Why Blood is Needed
                </h2>
                <p className="text-base text-slate leading-relaxed">{req.requestMessage}</p>
              </div>

              {/* Donor info (if inprogress) */}
              {req.status === "inprogress" && req.donorName && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-blue-800 mb-2 text-sm">Donor Confirmed</h2>
                  <p className="text-sm text-blue-700">{req.donorName}</p>
                  <p className="text-xs text-blue-600">{req.donorEmail}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Status card */}
              <div className="bg-white border border-border rounded-2xl p-6">
                <p className="text-xs font-semibold text-ash uppercase tracking-wider mb-3">
                  Request Status
                </p>
                <Chip
                  size="lg"
                  color={
                    req.status === "pending" ? "warning" :
                      req.status === "inprogress" ? "primary" :
                        req.status === "done" ? "success" : "danger"
                  }
                  variant="flat"
                  className="text-sm capitalize"
                >
                  {req.status}
                </Chip>
              </div>

              {/* Donate CTA */}
              <div className="bg-wine rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] dot-bg" />
                <div className="relative">
                  <h3 className="font-display text-2xl text-ivory mb-2">Ready to Help?</h3>
                  <p className="text-ivory/70 text-sm mb-5">
                    Your blood can save this person's life. Click below to confirm your donation.
                  </p>
                  {canDonate ? (
                    <Button
                      onPress={onOpen}
                      className="w-full bg-ivory text-wine font-bold rounded-xl
                                 hover:bg-cream transition-colors"
                      size="lg"
                    >
                      Donate Now
                    </Button>
                  ) : (
                    <Button
                      isDisabled
                      className="w-full bg-ivory/30 text-ivory/60 font-bold rounded-xl"
                      size="lg"
                    >
                      {donated ? "Donation Confirmed ✓" : "Not Available"}
                    </Button>
                  )}
                </div>
              </div>

              {/* Back link */}
              <Link href="/donation-requests">
                <Button
                  variant="bordered"
                  className="w-full border-border text-slate font-medium rounded-xl"
                >
                  ← Back to Requests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Donate confirmation modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalContent>
          <ModalHeader className="font-display text-2xl">Confirm Donation</ModalHeader>
          <ModalBody className="space-y-4">
            <p className="text-ash text-sm">
              By confirming, you agree to visit{" "}
              <strong className="text-charcoal">{req.hospitalName}</strong> on{" "}
              <strong className="text-charcoal">{req.donationDate}</strong> at{" "}
              <strong className="text-charcoal">{req.donationTime}</strong> to donate{" "}
              <strong className="text-wine">{req.bloodGroup}</strong> blood for{" "}
              <strong className="text-charcoal">{req.recipientName}</strong>.
            </p>

            <div className="bg-cream border border-border rounded-xl p-4 space-y-2">
              <div>
                <label className="form-label">Donor Name</label>
                <input className="form-input" value={user.name} readOnly />
              </div>
              <div>
                <label className="form-label">Donor Email</label>
                <input className="form-input" value={user.email} readOnly />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button
              className="bg-wine text-white font-semibold"
              isLoading={donating}
              onPress={handleDonate}
            >
              Confirm Donation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
