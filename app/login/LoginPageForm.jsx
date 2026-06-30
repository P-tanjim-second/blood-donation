"use client";
import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPageForm({redirectTo}) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const {data, error} = await signIn.email(form);
      if (data) {
        toast.success("Login successfull.")
        router.push(redirectTo)
      };
      if (error) {
        toast.error(error.message);
      };
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-[44%] bg-wine relative overflow-hidden flex-col justify-between p-12">
        {/* Dot bg */}
        <div className="absolute inset-0 opacity-[0.05] dot-bg" />
        {/* Blob */}
        <div
          className="hero-blob absolute -bottom-24 -right-24 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-ivory/20 flex items-center justify-center">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z"
                fill="white" />
            </svg>
          </div>
          <span className="font-display text-xl font-semibold text-ivory tracking-tight">Vitae</span>
        </Link>

        {/* Blood types visual */}
        <div className="relative">
          <div className="grid grid-cols-4 gap-2">
            {["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"].map((t, i) => (
              <div
                key={t}
                className="aspect-square flex items-center justify-center
                           border border-ivory/15 rounded-xl"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="font-display text-xl font-medium text-ivory/50">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative">
          <p className="font-display text-3xl text-ivory/85 leading-[1.2] font-light italic">
            "The blood you donate gives someone else another chance at life."
          </p>
          <p className="text-ivory/40 text-sm mt-3 font-mono">— WHO</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-wine flex items-center justify-center">
              <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
                <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z" fill="white" />
              </svg>
            </div>
            <span className="font-display text-xl font-semibold text-charcoal">Vitae</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="font-display font-medium text-charcoal mb-2" style={{ fontSize: "clamp(32px, 4vw, 44px)" }}>
              Welcome back.
            </h1>
            <p className="text-ash text-sm">
              Sign in to your account to manage your donations.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="form-label mb-0">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  className="form-input pr-11"
                  placeholder="Your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-charcoal"
                >
                  {showPw ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              className="w-full bg-wine text-white font-semibold rounded-xl mt-2
                         hover:bg-wine-dark transition-colors shadow-wine-sm"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-ash mt-6">
            {"Don't have an account? "}
            <Link href={`/register${redirectTo == '/' ? '': '?redirect=' + redirectTo}`} className="text-wine font-semibold hover:underline">
              Register for free
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-border" />
            <span className="text-xs text-ash/50 font-mono">OR</span>
            <span className="flex-1 h-px bg-border" />
          </div>

          {/* Demo hint */}
          <div className="p-4 rounded-xl bg-cream border border-border text-xs text-ash">
            <p className="font-semibold text-charcoal mb-1">Demo credentials</p>
            <p>Email: <code className="font-mono text-wine">apon@apon.com</code></p>
            <p>Password: <code className="font-mono text-wine">asdf12345</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
