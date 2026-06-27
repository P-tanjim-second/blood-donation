"use client";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { donationRequestsAPI } from "@/lib/api";
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from "@/lib/mockData";
import { getUser } from "@/lib/api/user/user";
import { CustomSelect } from "@/components/CustomSelect";
import toast from "react-hot-toast";
import { postDonationRequest } from "@/lib/api/server/mutation";

// 1. ✅ FIXED: Moved Field OUTSIDE the component so it doesn't remount on every keystroke
const Field = ({ label, required, children }) => (
  <div>
    <label className="form-label">
      {label} {required && <span className="text-wine">*</span>}
    </label>
    {children}
  </div>
);

export default function CreateDonationRequestPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  useEffect(() => {
    async function session() {
      const session = await getUser();
      if (session?.user) {
        setUser(session.user);
        setForm((f) => ({ ...f, bloodGroup: session.user.bloodGroup || "" }));
      }
    }
    session();
  }, []);

  if (user?.status === 'blocked') {
    return (
      <div className="h-screen flex flex-col gap-3 justify-center items-center">
        <h1 className="font-display text-4xl font-bold text-charcoal/70">You are blocked by admin.</h1>
        <p className="font-display text-base text-charcoal/40 font-medium">Please contact admin for more information</p>
      </div>
    );
  }

  const upazilas = form.recipientDistrict ? (UPAZILAS[form.recipientDistrict] || []) : [];
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.status === "blocked") {
      alert("Your account is blocked. You cannot create donation requests.");
      return;
    }
    setLoading(true);
    try {
      const request = {
        ...form,
        requesterName: user?.name,
        requesterEmail: user?.email,
        status: "pending",
      };
      const res = await postDonationRequest(request);
      console.log(res)
      if (res.status == 200 || res.status == 201) {
        toast.success(res.message);
        setSuccess(true);
        setTimeout(() => router.push("/dashboard/my-donation-requests"), 2000);
      }
      else {
        toast.error("Donation request failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-medium text-charcoal mb-2">Request Created!</h2>
        <p className="text-ash text-sm">Your donation request has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-charcoal">New Donation Request</h1>
      </div>

      <div className="bg-white border border-border rounded-2xl p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4 pb-5 border-b border-border">
            <Field label="Requester Name">
              <input className="form-input" value={user?.name || ""} readOnly />
            </Field>
            <Field label="Requester Email">
              <input className="form-input" value={user?.email || ""} readOnly />
            </Field>
          </div>

          {/* 2. ✅ FIXED: Direct 'value' binding + valid string fallback to avoid uncontrolled states */}
          <Field label="Recipient Name" required>
            <input
              required
              className="form-input"
              placeholder="Full name of the recipient"
              value={form.recipientName || ""}
              onChange={(e) => update("recipientName", e.target.value)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Recipient District" required>
              <CustomSelect
                required
                className="form-input"
                placeholder='Select District'
                options={DISTRICTS}
                value={form.recipientDistrict}
                onChange={(val) => { update("recipientDistrict", val); update("recipientUpazila", ""); }}
              />
            </Field>
            <Field label="Recipient Upazila" required>
              <CustomSelect
                required
                className="form-input"
                placeholder="Select Upazila"
                options={upazilas}
                value={form.recipientUpazila}
                onChange={(val) => update("recipientUpazila", val)}
              />
            </Field>
          </div>

          <Field label="Hospital Name" required>
            <input
              required
              className="form-input"
              placeholder="e.g. Dhaka Medical College Hospital"
              value={form.hospitalName || ""}
              onChange={(e) => update("hospitalName", e.target.value)}
            />
          </Field>

          <Field label="Full Address" required>
            <input
              required
              className="form-input"
              placeholder="Street address, area"
              value={form.fullAddress || ""}
              onChange={(e) => update("fullAddress", e.target.value)}
            />
          </Field>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Blood Group" required>
              <CustomSelect
                required
                className="form-input"
                placeholder='Select Blood Group'
                options={BLOOD_GROUPS}
                value={form.bloodGroup}
                onChange={(val) => update("bloodGroup", val)}
              />
            </Field>
            <Field label="Donation Date" required>
              <input
                type="date"
                required
                className="form-input"
                value={form.donationDate || ""}
                onChange={(e) => update("donationDate", e.target.value)}
              />
            </Field>
            <Field label="Donation Time" required>
              <input
                type="time"
                required
                className="form-input"
                value={form.donationTime || ""}
                onChange={(e) => update("donationTime", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Request Message" required>
            <textarea
              required
              rows={4}
              className="form-input resize-none"
              placeholder="Explain why you need blood..."
              value={form.requestMessage || ""}
              onChange={(e) => update("requestMessage", e.target.value)}
            />
          </Field>

          <div className="flex gap-3 pt-2">
            <Button type="submit" size="lg" isLoading={loading} className="bg-wine text-white font-semibold rounded-xl px-8">
              Submit Request
            </Button>
            <Button type="button" variant="bordered" size="lg" className="border-border text-slate rounded-xl" onPress={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}