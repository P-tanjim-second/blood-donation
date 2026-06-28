"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from "@/lib/mockData";
import { CustomSelect } from "@/components/CustomSelect";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterFormPage({redirectTo}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    bloodGroup: "", district: "", upazila: "", avatar: "",
  });

  const upazilas = form.district ? (UPAZILAS[form.district] || []) : [];

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setAvatarPreview(json.data.url)
        setForm(f => ({ ...f, avatar: json.data.url }));
      }
    } catch {
      setError("Image upload failed. Please try again.");
    }
    finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const user = {
      name: form.name,
      email: form.email,
      password: form.confirmPassword,
      avatar: form.avatar,
      district: form.district,
      upazila: form.upazila,
      bloodGroup: form.bloodGroup,
      role: "donor",
      status: "active"
    }
    try {
      console.log(user)
      const {data, error} = await signUp.email(user);
      if (data) {
        toast.success("Registration successfull.")
        router.push(redirectTo);
      }
      if (error) {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message)
      setError("Registration failed. Please try again.");
      
    } finally {
      setLoading(false);
    }
  };

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[40%] bg-charcoal relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-[0.04] dot-bg" />
        <div
          className="hero-blob absolute -top-16 -left-16 w-72 h-72 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,26,47,0.5) 0%, transparent 70%)" }}
        />

        <Link href="/" className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-wine flex items-center justify-center">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z" fill="white" />
            </svg>
          </div>
          <span className="font-display text-xl font-semibold text-ivory tracking-tight">Vitae</span>
        </Link>

        <div className="relative space-y-6">
          {["Be a hero.", "One donation.", "Three lives saved."].map((t, i) => (
            <p key={i} className={`font-display leading-tight font-light ${i === 0 ? "text-5xl text-ivory" : i === 1 ? "text-4xl text-ivory/70" : "text-3xl text-ivory/40"
              }`}>{t}</p>
          ))}
        </div>

        <div className="relative border border-ivory/10 rounded-2xl p-5">
          <p className="text-ivory/50 text-sm leading-relaxed">
            Blood donation is one of the most impactful gifts you can give.
            It costs you an hour, but gives someone else a lifetime.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-12">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-wine flex items-center justify-center">
                <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
                  <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z" fill="white" />
                </svg>
              </div>
              <span className="font-display text-xl font-semibold text-charcoal">Vitae</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-display font-medium text-charcoal mb-2" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
              Create Account
            </h1>
            <p className="text-ash text-sm">Join thousands of donors across Bangladesh.</p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar */}
            <div>
              <label className="form-label">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-border
                                overflow-hidden flex items-center justify-center bg-cream shrink-0">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" className="text-ash">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border
                    text-slate hover:bg-cream transition-colors ${uploading ? "opacity-50" : ""}`}>
                    {uploading ? "Uploading…" : "Upload Photo"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
            </div>

            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Full Name</label>
                <input required className="form-input" placeholder="Your full name"
                  value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input type="email" required className="form-input" placeholder="you@example.com"
                  value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
            </div>

            {/* Blood group */}
            <div>
              <label className="form-label">Blood Group</label>
              <CustomSelect
                options={BLOOD_GROUPS}
                value={form.bloodGroup}
                placeholder="Select Blood Group"
                onChange={(val) => update("bloodGroup", val)}
              />
            </div>

            {/* District + Upazila */}
            <div className="grid sm:grid-cols-2 gap-4">
              <CustomSelect
                options={DISTRICTS}
                value={form.district}
                placeholder="Select District"
                onChange={(val) => {
                  update("district", val);
                  update("upazila", ""); // Reset child
                }}
              />

              <CustomSelect
                options={UPAZILAS[form.district] || []}
                value={form.upazila}
                placeholder={form.district ? "Select Upazila" : "Select District first"}
                onChange={(val) => update("upazila", val)}
              />
            </div>

            {/* Passwords */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Password</label>
                <input type="password" required className="form-input" placeholder="Min 6 characters"
                  value={form.password} onChange={(e) => update("password", e.target.value)} />
              </div>
              <div>
                <label className="form-label">Confirm Password</label>
                <input type="password" required className="form-input" placeholder="Repeat password"
                  value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              className="w-full bg-wine text-white font-semibold rounded-xl mt-2
                         hover:bg-wine-dark transition-colors shadow-wine-sm"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-ash mt-5">
            Already have an account?{" "}
            <Link href={`/login${redirectTo == '/' ? '': '?redirect=' + redirectTo}`} className="text-wine font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
