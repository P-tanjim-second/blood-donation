"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button, Avatar } from "@heroui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from "@/lib/mockData";
import { CustomSelect } from "@/components/CustomSelect";
import toast from "react-hot-toast";
import { getAllDonors } from "@/lib/api/user/user";

const BG = {
  "A+": "bg-red-50 text-red-700", "B+": "bg-orange-50 text-orange-700",
  "AB+": "bg-purple-50 text-purple-700", "O+": "bg-blue-50 text-blue-700",
  "A-": "bg-rose-50 text-rose-700", "B-": "bg-amber-50 text-amber-700",
  "AB-": "bg-fuchsia-50 text-fuchsia-700", "O-": "bg-sky-50 text-sky-700",
};

function DonorCard({ donor }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 hover-lift flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Avatar src={donor.avatar} name={donor.name} size="lg" isBordered
          color={"primary"} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-charcoal truncate">{donor.name}</p>
          <p className="text-xs text-ash mt-0.5">{donor.district}, {donor.upazila}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`font-mono font-bold text-sm px-2.5 py-0.5 rounded-lg ${BG[donor.bloodGroup] || "bg-gray-50 text-gray-700"}`}>
              {donor.bloodGroup}
            </span>
            <span className={`flex items-center gap-1 text-xs font-medium ${"text-green-600"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${"bg-green-500 animate-pulse"}`} />
              {"Available"}
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs text-ash border-t border-border pt-4">
        Last donated:{" "}
        <span className="text-charcoal font-medium">{donor.lastDonated}</span>
      </div>

        <Button size="sm"
          className="bg-wine text-white font-semibold rounded-xl hover:bg-wine-dark transition-colors">
          Contact Donor
        </Button>
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [form, setForm] = useState({
    bloodGroup: searchParams.get("bloodGroup") || "",
    district: searchParams.get("district") || "",
    upazila: searchParams.get("upazila") || "",
  });
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const upazilas = form.district ? (UPAZILAS[form.district] || []) : [];
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const fetchDonors = async (filters) => {
    setLoading(true);
    try {
      const response = await getAllDonors(filters);
      const donors = response?.donors || [];
      setResults(donors);
    } catch (error) {
      console.error("Search page: donor fetch failed", error);
      toast.error("Something went wrong while fetching donors");
    } finally {
      setSearched(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const bg = searchParams.get("bloodGroup") || "";
    const dist = searchParams.get("district") || "";
    const upz = searchParams.get("upazila") || "";

    setForm({ bloodGroup: bg, district: dist, upazila: upz });

    if (bg || dist || upz) {
      fetchDonors({ bloodGroup: bg, district: dist, upazila: upz });
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e?.preventDefault();

    if (!form.bloodGroup && !form.district && !form.upazila) {
      toast.error("Please select at least one field");
      return;
    }

    const params = new URLSearchParams();
    if (form.bloodGroup) params.set("bloodGroup", form.bloodGroup);
    if (form.district) params.set("district", form.district);
    if (form.upazila) params.set("upazila", form.upazila);

    router.push(`${pathname}?${params.toString()}`);
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <>
      <div className="bg-cream border-b border-border py-10">
        <div className="max-w-8xl mx-auto px-5 lg:px-10">
          <p className="eyebrow mb-3">Donor Search</p>
          <h1 className="font-display font-medium text-charcoal mb-7"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Find a Compatible
            <em className="text-wine not-italic"> Donor</em>
          </h1>

          <form onSubmit={handleSearch}
            className="bg-white border border-border rounded-2xl p-5
                       flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="flex-1">
              <label className="form-label text-[11px]">Blood Group</label>
              <CustomSelect className="form-input mt-1"
                placeholder={"Blood Group"}
                value={form.bloodGroup}
                onChange={(value) => update("bloodGroup", value)}
                options={BLOOD_GROUPS}
              />
            </div>
            <div className="flex-1">
              <label className="form-label text-[11px]">District</label>
              <CustomSelect className="form-input mt-1"
                placeholder={"District"}
                value={form.district}
                onChange={(value) => { update("district", value); update("upazila", ""); }}
                options={DISTRICTS}
              />
            </div>
            <div className="flex-1">
              <label className="form-label text-[11px]">Upazila</label>
              <CustomSelect className="form-input mt-1"
                placeholder={"Upazila"}
                value={form.upazila} onChange={(value) => update("upazila", value)}
                options={upazilas}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" isLoading={loading}
                className="bg-wine text-white font-semibold px-7 rounded-xl
                           hover:bg-wine-dark transition-colors w-full sm:w-auto">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-8xl mx-auto px-5 lg:px-10 py-10">
        {!searched ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-wine/8 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" className="text-wine">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-ash text-sm">Use the search form above to find available donors.</p>
          </div>
        ) : loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-52 rounded-2xl bg-cream animate-pulse" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ash text-sm">No donors found matching your criteria.</p>
            <p className="text-ash/60 text-xs mt-2">Try a different blood group or location.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-ash">
                Found <strong className="text-charcoal">{results.length}</strong> donors
              </p>
              <Button size="sm" variant="bordered"
                className="border-border text-slate text-xs font-medium rounded-xl"
                onPress={downloadPDF}>
                Download PDF
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((d) => <DonorCard key={d._id} donor={d} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function SearchDonor() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pt-16">
        <Suspense fallback={<div className="h-screen bg-ivory flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-wine border-t-transparent animate-spin" />
        </div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}