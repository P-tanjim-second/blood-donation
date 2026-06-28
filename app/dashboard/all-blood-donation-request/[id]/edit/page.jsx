"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { donationRequestsAPI } from "@/lib/api";
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from "@/lib/mockData";
import { getUser } from "@/lib/api/user/user";
import { getRequestById } from "@/lib/api/server/action";
import { updateRequest } from "@/lib/api/server/mutation";
import toast from "react-hot-toast";

const STATUS_OPTS = ["pending", "inprogress", "done", "canceled"];
const STATUS_CHIP = {
    pending: { color: "warning", label: "Pending" },
    inprogress: { color: "primary", label: "In Progress" },
    done: { color: "success", label: "Done" },
    canceled: { color: "danger", label: "Canceled" },
};

export default function AdminEditRequestPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [notFound, setNotFound] = useState(false);

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
        status: "pending",
    });

    useEffect(() => {
        async function checkAuthAndFetchData() {
            try {
                // 1. Authenticate user session
                const session = await getUser();

                if (!session || !session.user) {
                    router.replace("/login");
                    return;
                }

                // 2. Validate authorized role (fixed precedence bug)
                const role = session.user.role;
                if (role !== "admin") {
                    router.replace("/dashboard");
                    return;
                }

                // 3. Prevent fetching data if route params are not ready yet
                if (!id) return;

                // 4. Fetch data ONLY after auth passes successfully
                const { request, status } = await getRequestById(id);
                if (status === 200 && request) {
                    setForm({
                        requesterName: request.requesterName || "",
                        requesterEmail: request.requesterEmail || "",
                        recipientName: request.recipientName || "",
                        recipientDistrict: request.recipientDistrict || "",
                        recipientUpazila: request.recipientUpazila || "",
                        hospitalName: request.hospitalName || "",
                        fullAddress: request.fullAddress || "",
                        bloodGroup: request.bloodGroup || "",
                        donationDate: request.donationDate || "",
                        donationTime: request.donationTime || "",
                        requestMessage: request.requestMessage || "",
                        status: request.status || "pending",
                    });
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Authorization or fetch failure:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }

        checkAuthAndFetchData();
    }, [id, router]);

    const upazilas = form.recipientDistrict ? UPAZILAS[form.recipientDistrict] || [] : [];
    const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await updateRequest(id, form);
            if (res.status === 200) {
                setSuccess(true);
                toast.success("Request updated successfully");
                setTimeout(() => router.push("/dashboard/all-blood-donation-request"), 1000);
            } else {
                toast.error("Failed to update request");
            }
        } catch {
            setSaving(false);
        }
    };

    const Field = ({ label, required, children }) => (
        <div>
            <label className="form-label">
                {label}
                {required && <span className="text-wine ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );

    if (loading) {
        return (
            <div className="max-w-2xl space-y-6">
                <div className="h-10 w-64 rounded-xl bg-parchment animate-pulse" />
                <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-12 rounded-xl bg-cream animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="max-w-2xl flex flex-col items-center justify-center py-24 text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-wine/8 border border-wine/20 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B1A2F" strokeWidth="1.6" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h2 className="font-display text-3xl font-medium text-charcoal">Request Not Found</h2>
                <p className="text-ash text-sm">This donation request doesn&apos;t exist or has been deleted.</p>
                <Button onPress={() => router.push("/dashboard/all-blood-donation-request")} className="bg-wine text-white font-semibold rounded-full hover:bg-wine-dark transition-colors">
                    Back to All Requests
                </Button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="max-w-lg mx-auto text-center py-20 flex flex-col items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h2 className="font-display text-3xl font-medium text-charcoal">Request Updated!</h2>
                <p className="text-ash text-sm">The donation request has been successfully updated.</p>
                <p className="text-xs text-ash/50">Redirecting to all requests…</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-ash hover:text-charcoal hover:bg-cream transition-all duration-200 shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="font-display text-3xl font-medium text-charcoal">Edit Request</h1>
                        <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-wine/8 text-wine uppercase tracking-wider">Admin</span>
                    </div>
                    <p className="text-sm text-ash mt-0.5">
                        Editing request by <span className="font-medium text-charcoal">{form.requesterName}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-wine/5 border border-wine/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B1A2F" strokeWidth="1.8" strokeLinecap="round" className="shrink-0 mt-0.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="text-xs text-wine/80 leading-relaxed">
                    You are editing another user&apos;s request as an admin. Changes will be saved immediately and the requester will see the updated information.
                </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-7">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4 pb-5 border-b border-border">
                        <Field label="Requester Name">
                            <input className="form-input" value={form.requesterName} readOnly />
                        </Field>
                        <Field label="Requester Email">
                            <input className="form-input" value={form.requesterEmail} readOnly />
                        </Field>
                    </div>

                    <Field label="Donation Status" required>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {STATUS_OPTS.map((s) => {
                                const isActive = form.status === s;
                                return (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => update("status", s)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium capitalize transition-all duration-200 ${isActive
                                                ? "bg-wine text-white border-wine shadow-wine-sm"
                                                : "border-border text-ash bg-surface hover:border-wine/30 hover:text-charcoal"
                                            }`}
                                    >
                                        {isActive && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="text-xs text-ash mt-2">
                            Current status:{" "}
                            <Chip size="sm" color={STATUS_CHIP[form.status]?.color || "default"} variant="flat" className="text-xs ml-1">
                                {STATUS_CHIP[form.status]?.label || form.status}
                            </Chip>
                        </div>
                    </Field>

                    <Field label="Recipient Name" required>
                        <input
                            required
                            className="form-input"
                            placeholder="Full name of the recipient"
                            value={form.recipientName}
                            onChange={(e) => update("recipientName", e.target.value)}
                        />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Recipient District" required>
                            <select
                                required
                                className="form-input"
                                value={form.recipientDistrict}
                                onChange={(e) => {
                                    update("recipientDistrict", e.target.value);
                                    update("recipientUpazila", "");
                                }}
                            >
                                <option value="">Select district</option>
                                {DISTRICTS.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Recipient Upazila" required>
                            <select
                                required
                                className="form-input"
                                value={form.recipientUpazila}
                                onChange={(e) => update("recipientUpazila", e.target.value)}
                            >
                                <option value="">Select upazila</option>
                                {upazilas.map((u) => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </Field>
                    </div>

                    <Field label="Hospital Name" required>
                        <input
                            required
                            className="form-input"
                            placeholder="e.g. Dhaka Medical College Hospital"
                            value={form.hospitalName}
                            onChange={(e) => update("hospitalName", e.target.value)}
                        />
                    </Field>

                    <Field label="Full Address" required>
                        <input
                            required
                            className="form-input"
                            placeholder="Street address, area"
                            value={form.fullAddress}
                            onChange={(e) => update("fullAddress", e.target.value)}
                        />
                    </Field>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <Field label="Blood Group" required>
                            <select required className="form-input" value={form.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)}>
                                <option value="">Select</option>
                                {BLOOD_GROUPS.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
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

                    <Field label="Request Message" required>
                        <textarea
                            required
                            rows={4}
                            className="form-input resize-none"
                            placeholder="Explain why blood is needed..."
                            value={form.requestMessage}
                            onChange={(e) => update("requestMessage", e.target.value)}
                        />
                    </Field>

                    <div className="flex gap-3 pt-1">
                        <Button
                            type="submit"
                            size="lg"
                            isLoading={saving}
                            className="bg-wine text-white font-semibold rounded-xl px-8 hover:bg-wine-dark transition-colors shadow-wine-sm"
                        >
                            Update Donation Request
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