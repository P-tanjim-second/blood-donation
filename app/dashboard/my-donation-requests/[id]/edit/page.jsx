// app/dashboard/my-donation-requests/[id]/edit/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { donationRequestsAPI } from "@/lib/api";
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from "@/lib/mockData";
import { getRequestById } from "@/lib/api/server/action";
import { CustomSelect } from "@/components/CustomSelect";
import toast from "react-hot-toast";
import { updateRequest } from "@/lib/api/server/mutation";

const Field = ({ label, required, children }) => (
    <div>
        <label className="form-label">
            {label}
            {required && <span className="text-wine ml-0.5">*</span>}
        </label>
        {children}
    </div>
);

export default function EditDonationRequestPage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [user, setUser] = useState(false);

    const [form, setForm] = useState({
        requesterName: "",
        requesterEmail: "",
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

    //check user login 
    useEffect(() => {
        async function checkUser() {
            const session = await getUser();
            if (!session?.user) {
                router.push("/login");
            }
            else{
                setUser(true)
            }
        }
        checkUser();
    }, []);

    // Load existing request data
    useEffect(() => {
        async function name() {
            const { request, status } = await getRequestById(id);
            if (status == 200) {
                const req = request
                console.log(req)
                setForm({
                    requesterName: req.requesterName || "",
                    requesterEmail: req.requesterEmail || "",
                    recipientName: req.recipientName || "",
                    recipientDistrict: req.recipientDistrict || "",
                    recipientUpazila: req.recipientUpazila || "",
                    hospitalName: req.hospitalName || "",
                    fullAddress: req.fullAddress || "",
                    bloodGroup: req.bloodGroup || "",
                    donationDate: req.donationDate || "",
                    donationTime: req.donationTime || "",
                    requestMessage: req.requestMessage || "",
                });
                setLoading(false)
            }
            else {
                setNotFound(true)
                setLoading(false)
            }
        }
            name();
    }, [id]);

    const upazilas = form.recipientDistrict
        ? (UPAZILAS[form.recipientDistrict] || [])
        : [];

    const update = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { request, status } = await updateRequest(id, form);
            if (status == 200) {
                setSuccess(true);
                toast.success("Donation Request Updated Successfully");
                setTimeout(() => router.push("/dashboard/my-donation-requests"), 2000);
            }
            else {
                setSaving(false);
                toast.error("Donation Request Not Updated");
            }
        } catch {
            setSaving(false);
            toast.error("Donation Request Not Updated");
        }
    };



    // ── Loading skeleton ───────────────────────────────────
    if (loading) {
        return (
            <div className="max-w-2xl space-y-6">
                <div className="h-10 w-56 rounded-xl bg-parchment animate-pulse" />
                <div className="bg-white border border-border rounded-2xl p-7 space-y-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-12 rounded-xl bg-cream animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    // ── Not found ──────────────────────────────────────────
    if (notFound) {
        return (
            <div className="max-w-2xl flex flex-col items-center justify-center py-24 text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-wine/8 border border-wine/20
                        flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="#8B1A2F" strokeWidth="1.6" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h2 className="font-display text-3xl font-medium text-charcoal">
                    Request Not Found
                </h2>
                <p className="text-ash text-sm">
                    This donation request doesn&apos;t exist or you don&apos;t have
                    permission to edit it.
                </p>
                <Button
                    onPress={() => router.push("/dashboard/my-donation-requests")}
                    className="bg-wine text-white font-semibold rounded-full
                     hover:bg-wine-dark transition-colors"
                >
                    Back to My Requests
                </Button>
            </div>
        );
    }

    // ── Success state ──────────────────────────────────────
    if (success) {
        return (
            <div className="max-w-lg mx-auto text-center py-20 flex flex-col items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200
                        flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h2 className="font-display text-3xl font-medium text-charcoal">
                    Request Updated!
                </h2>
                <p className="text-ash text-sm">
                    Your donation request has been successfully updated.
                </p>
                <p className="text-xs text-ash/50">Redirecting to your requests…</p>
            </div>
        );
    }

    // ── Edit form ──────────────────────────────────────────
    return (
        <div className="max-w-2xl space-y-6">

            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 rounded-xl border border-border flex items-center
                     justify-center text-ash hover:text-charcoal hover:bg-cream
                     transition-all duration-200 shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="font-display text-3xl font-medium text-charcoal">
                        Edit Request
                    </h1>
                    <p className="text-sm text-ash mt-0.5">
                        Update the details of your donation request.
                    </p>
                </div>
            </div>

            {/* Form card */}
            <div className="bg-white border border-border rounded-2xl p-7">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Read-only requester info */}
                    <div className="grid sm:grid-cols-2 gap-4 pb-5 border-b border-border">
                        <Field label="Requester Name">
                            <input
                                className="form-input"
                                value={form.requesterName}
                                readOnly
                            />
                        </Field>
                        <Field label="Requester Email">
                            <input
                                className="form-input"
                                value={form.requesterEmail}
                                readOnly
                            />
                        </Field>
                    </div>

                    {/* Recipient name */}
                    <Field label="Recipient Name" required>
                        <input
                            required
                            className="form-input"
                            placeholder="Full name of the recipient"
                            value={form.recipientName}
                            onChange={(e) => update("recipientName", e.target.value)}
                        />
                    </Field>

                    {/* District + Upazila */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Recipient District" required>
                            <CustomSelect
                                options={DISTRICTS}
                                placeholder={"Select District"}
                                value={form.recipientDistrict}
                                onChange={(val) => {
                                    update("recipientDistrict", val);
                                    update("recipientUpazila", "");
                                }}
                            >
                            </CustomSelect>
                        </Field>
                        <Field label="Recipient Upazila" required>
                            <CustomSelect
                                options={upazilas}
                                placeholder={"Select Upazila"}
                                value={form.recipientUpazila}
                                onChange={(val) => update("recipientUpazila", val)}
                            >
                            </CustomSelect>
                        </Field>
                    </div>

                    {/* Hospital */}
                    <Field label="Hospital Name" required>
                        <input
                            required
                            className="form-input"
                            placeholder="e.g. Dhaka Medical College Hospital"
                            value={form.hospitalName}
                            onChange={(e) => update("hospitalName", e.target.value)}
                        />
                    </Field>

                    {/* Address */}
                    <Field label="Full Address" required>
                        <input
                            required
                            className="form-input"
                            placeholder="Street address, area"
                            value={form.fullAddress}
                            onChange={(e) => update("fullAddress", e.target.value)}
                        />
                    </Field>

                    {/* Blood group + date + time */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Field label="Blood Group" required>
                            <CustomSelect
                                options={BLOOD_GROUPS}
                                placeholder={"Select Blood Group"}
                                value={form.bloodGroup}
                                onChange={(val) => update("bloodGroup", val)}
                            >
                            </CustomSelect>
                        </Field>
                        <Field label="Donation Date" required>
                            <input
                                type="date"
                                required
                                className="form-input"
                                value={form.donationDate}
                                onChange={(e) => update("donationDate", e.target.value)}
                            />
                        </Field>
                        <Field label="Donation Time" required>
                            <input
                                type="time"
                                required
                                className="form-input"
                                value={form.donationTime}
                                onChange={(e) => update("donationTime", e.target.value)}
                            />
                        </Field>
                    </div>

                    {/* Message */}
                    <Field label="Request Message" required>
                        <textarea
                            required
                            rows={4}
                            className="form-input resize-none"
                            placeholder="Explain why you need blood — situation, urgency, etc."
                            value={form.requestMessage}
                            onChange={(e) => update("requestMessage", e.target.value)}
                        />
                    </Field>

                    {/* Status note */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-border">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#787878" strokeWidth="1.8" strokeLinecap="round"
                            className="shrink-0 mt-0.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-xs text-ash leading-relaxed">
                            The donation status will not be changed by editing this form.
                            Status can only be updated from the requests table.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <Button
                            type="submit"
                            size="lg"
                            isLoading={saving}
                            className="bg-wine text-white font-semibold rounded-xl px-8
                         hover:bg-wine-dark transition-colors shadow-wine-sm"
                        >
                            Update Donation Request
                        </Button>
                        <Button
                            type="button"
                            variant="bordered"
                            size="lg"
                            className="border-border text-slate rounded-xl"
                            onPress={() => router.back()}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}