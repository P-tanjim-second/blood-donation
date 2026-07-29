"use client";
import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

// ── Mock data (replace with real API calls) ────────────────────────────────
const MOCK = {
  weekly: [
    { label: "Mon", requests: 8,  done: 5,  pending: 3  },
    { label: "Tue", requests: 14, done: 9,  pending: 5  },
    { label: "Wed", requests: 11, done: 7,  pending: 4  },
    { label: "Thu", requests: 19, done: 13, pending: 6  },
    { label: "Fri", requests: 22, done: 15, pending: 7  },
    { label: "Sat", requests: 17, done: 12, pending: 5  },
    { label: "Sun", requests: 9,  done: 6,  pending: 3  },
  ],
  monthly: [
    { label: "Jan", requests: 78,  done: 52,  pending: 26 },
    { label: "Feb", requests: 91,  done: 64,  pending: 27 },
    { label: "Mar", requests: 105, done: 78,  pending: 27 },
    { label: "Apr", requests: 88,  done: 61,  pending: 27 },
    { label: "May", requests: 124, done: 93,  pending: 31 },
    { label: "Jun", requests: 137, done: 104, pending: 33 },
    { label: "Jul", requests: 119, done: 88,  pending: 31 },
    { label: "Aug", requests: 143, done: 111, pending: 32 },
    { label: "Sep", requests: 98,  done: 72,  pending: 26 },
    { label: "Oct", requests: 112, done: 84,  pending: 28 },
    { label: "Nov", requests: 156, done: 121, pending: 35 },
    { label: "Dec", requests: 131, done: 99,  pending: 32 },
  ],
  yearly: [
    { label: "2021", requests: 420,  done: 298, pending: 122 },
    { label: "2022", requests: 680,  done: 501, pending: 179 },
    { label: "2023", requests: 940,  done: 718, pending: 222 },
    { label: "2024", requests: 1203, done: 934, pending: 269 },
    { label: "2025", requests: 1487, done: 1162, pending: 325 },
  ],
};

const TABS = [
  { key: "weekly",  label: "Weekly"  },
  { key: "monthly", label: "Monthly" },
  { key: "yearly",  label: "Yearly"  },
];

// ── Custom tooltip ─────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl shadow-card-hover
                    px-4 py-3 min-w-[140px]">
      <p className="text-xs font-mono font-semibold text-ash uppercase
                    tracking-wider mb-2">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name}
          className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }} />
            <span className="text-xs text-ash capitalize">{entry.name}</span>
          </div>
          <span className="text-xs font-mono font-bold text-charcoal">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Summary pill ───────────────────────────────────────────────────────────
function SummaryPill({ label, value, color }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full
                    border border-border bg-cream/60">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-xs text-ash">{label}</span>
      <span className="text-xs font-mono font-bold text-charcoal ml-1">{value}</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function DonationChart({ fetchChartData }) {
  const [tab, setTab]         = useState("monthly");
  const [chartType, setChartType] = useState("area"); // "area" | "bar"
  const [data, setData]       = useState(MOCK.monthly);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // TODO: replace MOCK with real API call when backend is ready
        // if (fetchChartData) {
        //   const result = await fetchChartData(tab);
        //   setData(result);
        //   setLoading(false);
        //   return;
        // }
        await new Promise((r) => setTimeout(r, 350)); // mock delay
        setData(MOCK[tab]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [tab]);

  // Summary totals
  const totalRequests = data.reduce((s, d) => s + d.requests, 0);
  const totalDone     = data.reduce((s, d) => s + d.done,     0);
  const totalPending  = data.reduce((s, d) => s + d.pending,  0);

  const peak = data.reduce(
    (max, d) => (d.requests > max.requests ? d : max),
    data[0] || {}
  );

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-card">

      {/* ── Card header ─────────────────────────────────── */}
      <div className="px-6 pt-6 pb-5 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-start
                        justify-between gap-4">
          <div>
            <p className="eyebrow mb-1.5">Analytics</p>
            <h3 className="font-display text-2xl font-medium text-charcoal">
              Donation Requests
            </h3>
            <p className="text-xs text-ash mt-1">
              Total, completed and pending breakdown
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Chart type toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-cream">
              {[
                {
                  key: "area",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                },
                {
                  key: "bar",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4"  />
                      <line x1="6"  y1="20" x2="6"  y2="14" />
                    </svg>
                  ),
                },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setChartType(t.key)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center
                              transition-all duration-200 ${
                    chartType === t.key
                      ? "bg-wine text-white shadow-wine-sm"
                      : "text-ash hover:text-charcoal"
                  }`}
                >
                  {t.icon}
                </button>
              ))}
            </div>

            {/* Period tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-cream">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                              transition-all duration-200 ${
                    tab === t.key
                      ? "bg-wine text-white shadow-wine-sm"
                      : "text-ash hover:text-charcoal"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <SummaryPill
            label="Total"   value={totalRequests} color="#8B1A2F" />
          <SummaryPill
            label="Done"    value={totalDone}     color="#16a34a" />
          <SummaryPill
            label="Pending" value={totalPending}  color="#d97706" />
          {peak?.label && (
            <SummaryPill
              label={`Peak · ${peak.label}`} value={peak.requests} color="#3b82f6" />
          )}
        </div>
      </div>

      {/* ── Chart area ──────────────────────────────────── */}
      <div className="p-6">
        {loading ? (
          <div className="h-[280px] flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-wine
                            border-t-transparent animate-spin" />
            <p className="text-xs text-ash">Loading chart data…</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            {chartType === "area" ? (
              <AreaChart data={data}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#8B1A2F" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#8B1A2F" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gradDone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#16a34a" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="gradPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#d97706" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E0D8"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#787878", fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#787878", fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E5E0D8", strokeWidth: 1 }} />
                <Area
                  type="monotone" dataKey="requests" name="requests"
                  stroke="#8B1A2F" strokeWidth={1.5}
                  fill="url(#gradRequests)" dot={false}
                  activeDot={{ r: 5, fill: "#8B1A2F", strokeWidth: 0 }}
                />
                <Area
                  type="monotone" dataKey="done" name="done"
                  stroke="#16a34a" strokeWidth={1}
                  fill="url(#gradDone)" dot={false}
                  activeDot={{ r: 4, fill: "#16a34a", strokeWidth: 0 }}
                />
                <Area
                  type="monotone" dataKey="pending" name="pending"
                  stroke="#d97706" strokeWidth={1}
                  fill="url(#gradPending)" dot={false}
                  activeDot={{ r: 4, fill: "#d97706", strokeWidth: 0 }}
                />
              </AreaChart>
            ) : (
              <BarChart data={data}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                barGap={2} barCategoryGap="30%">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E0D8"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#787878", fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#787878", fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F0EDE8" }} />
                <Bar
                  dataKey="requests" name="requests"
                  fill="#8B1A2F" radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="done" name="done"
                  fill="#16a34a" radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="pending" name="pending"
                  fill="#d97706" radius={[5, 5, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Legend ──────────────────────────────────────── */}
      <div className="px-6 pb-5 flex items-center gap-5 flex-wrap">
        {[
          { color: "#8B1A2F", label: "Total Requests" },
          { color: "#16a34a", label: "Completed"      },
          { color: "#d97706", label: "Pending"         },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: l.color }} />
            <span className="text-xs text-ash">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}