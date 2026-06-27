"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
// import { donationRequestsAPI, statsAPI } from "@/lib/api";
import { redirect } from "next/navigation";
import { getAllUsers, getUser } from "@/lib/api/user/user";
import TableSkeleton from "@/components/TableSkeleton";
import { dashboardData, getAllRequests, getMyDonationRequests, getUsersCount } from "@/lib/api/server/action";

const STATUS_CHIP = {
  pending: { color: "warning", label: "Pending" },
  inprogress: { color: "primary", label: "In Progress" },
  done: { color: "success", label: "Done" },
  canceled: { color: "danger", label: "Canceled" },
};

function StatCard({ icon, label, value, sub, color = "wine" }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-card hover-lift">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center
          ${color === "wine" ? "bg-wine/8 text-wine" :
            color === "amber" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
          {icon}
        </div>
        <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg
          ${color === "wine" ? "bg-wine/8 text-wine" :
            color === "amber" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
          Live
        </span>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-mono font-bold text-charcoal">{value}</p>
        <p className="text-sm font-semibold text-charcoal mt-1">{label}</p>
        {sub && <p className="text-xs text-ash mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

const ICON_USER = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const ICON_DROP = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);
const ICON_MONEY = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loadingReqs, setLoadingReqs] = useState(true);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);



  useEffect(() => {
    async function session() {
      const session = await getUser();
      if (session?.user) {
        setUser(session.user)
        if (isAdmin || isVolunteer) {
          const data = await dashboardData();
          setTotalDonors(parseInt(data[0].total));
          setTotalRequests(parseInt(data[1].total));
          setTotalFunding(parseInt(data[2].funding));
        }
      }
      else {
        redirect('/login')
      }
    }
    session()
  }, [])

  const isAdmin = user?.role === "admin";
  const isVolunteer = user?.role === "volunteer";



  useEffect(() => {
    if (!isAdmin && !isVolunteer && user?.role == 'donor') {

      async function getRecentRequests() {
        const { requests } = await getMyDonationRequests(user?.email, { limit: 3 });
        setRecentRequests(requests);
        setLoadingReqs(false);
      }
      getRecentRequests()
    }
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-wine rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center
                      justify-between gap-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] dot-bg" />
        <div className="relative">
          <p className="text-ivory/60 text-sm font-mono">Welcome back 👋</p>
          {user ? <h1 className="font-display capitalize text-3xl sm:text-4xl font-medium text-ivory mt-1">
            {user?.name}
          </h1> :
            <h1 className="font-display capitalize text-3xl sm:text-4xl font-medium text-ivory mt-1">Loading...</h1>
          }
          {user ? <p className="text-ivory/60 text-sm mt-1 capitalize">{user?.role} · {user?.bloodGroup}</p> :
            <p className="h-5 w-20 rounded-lg bg-cream animate-pulse mt-1"></p>
          }
        </div>
        {user?.role === "donor" && (
          <div className="relative">
            <Link href="/dashboard/create-donation-request">
              <Button className="bg-ivory text-wine font-semibold rounded-full hover:bg-cream transition-colors">
                + New Request
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Admin / Volunteer stats */}
      {(isAdmin || isVolunteer) && (
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard icon={ICON_USER} label="Total Donors" value={totalDonors.toLocaleString()} sub="Registered users" color="wine" />
          <StatCard icon={ICON_MONEY} label="Total Funding" value={`৳${totalFunding}K`} sub="Community raised" color="amber" />
          <StatCard icon={ICON_DROP} label="Blood Requests" value={totalRequests.toLocaleString()} sub="All time" color="blue" />
        </div>
      )}

      {/* Recent requests (donor view) */}
      {!isAdmin && !isVolunteer && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-charcoal text-lg">Recent Requests</h2>
            <Link href="/dashboard/my-donation-requests">
              <Button size="sm" variant="light" className="text-wine font-medium">
                View all →
              </Button>
            </Link>
          </div>

          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            {loadingReqs ? (
              <TableSkeleton theads={["Recipient", "Location", "Blood", "Date", "Status", "Actions"]} />
            ) : recentRequests.length === 0 ? (
              <div className="bg-cream rounded-2xl p-10 text-center">
                <p className="text-ash text-sm mb-4">You haven't made any donation requests yet.</p>
                <Link href="/dashboard/create-donation-request">
                  <Button className="bg-wine text-white font-semibold rounded-full">
                    Create First Request
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-cream">
                        {["Recipient", "Location", "Blood", "Date", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-ash uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentRequests.map((req) => {
                        const st = STATUS_CHIP[req.status] || { color: "default", label: req.status };
                        return (
                          <tr key={req._id} className="hover:bg-cream/50 transition-colors">
                            <td className="px-5 py-4 font-medium text-charcoal">{req.recipientName}</td>
                            <td className="px-5 py-4 text-ash">{req.recipientDistrict}, {req.recipientUpazila}</td>
                            <td className="px-5 py-4">
                              <span className="font-mono font-semibold text-wine text-xs px-2 py-1 bg-wine/8 rounded-lg">
                                {req.bloodGroup}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-ash">{req.donationDate}</td>
                            <td className="px-5 py-4">
                              <Chip size="sm" color={st.color} variant="flat">{st.label}</Chip>
                            </td>
                            <td className="px-5 py-4">
                              <Link href={`/donation-requests/${req._id}`}>
                                <Button size="sm" variant="light" className="text-wine font-medium h-7 px-3">
                                  View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin quick links */}
      {(isAdmin || isVolunteer) && (
        <div>
          <h2 className="font-semibold text-charcoal text-lg mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Manage All Users", desc: "Block, unblock, change roles", href: "/dashboard/all-users", color: "bg-wine/8 text-wine" },
              { label: "All Donation Requests", desc: "View and manage every request", href: "/dashboard/all-blood-donation-request", color: "bg-blue-50 text-blue-700" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white border border-border rounded-2xl p-5 hover-lift cursor-pointer">
                  <div className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold mb-3 ${item.color}`}>
                    Quick Access
                  </div>
                  <p className="font-semibold text-charcoal">{item.label}</p>
                  <p className="text-xs text-ash mt-1">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
