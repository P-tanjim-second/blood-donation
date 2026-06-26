"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Avatar, Button, Chip } from "@heroui/react";
import { getUser } from "@/lib/api/user/user";

// Icons (inline SVG for zero-dep) 
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  profile: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  requests: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2",
  add: "M12 5v14 M5 12h14",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  close: "M18 6L6 18 M6 6l12 12",
  drop: "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
};

// Role-based nav config
const getNavItems = (role) => {
  const common = [
    { label: "Dashboard", href: "/dashboard", icon: "home" },
    { label: "My Profile", href: "/dashboard/profile", icon: "profile" },
  ];
  const donorItems = [
    { label: "My Requests", href: "/dashboard/my-donation-requests", icon: "requests" },
    { label: "New Request", href: "/dashboard/create-donation-request", icon: "add" },
  ];
  const adminItems = [
    { label: "All Users", href: "/dashboard/all-users", icon: "users" },
    { label: "All Requests", href: "/dashboard/all-blood-donation-request", icon: "requests" },
  ];
  const volunteerItems = [
    { label: "All Requests", href: "/dashboard/all-blood-donation-request", icon: "requests" },
  ];

  if (role === "admin") return [...common, ...donorItems, ...adminItems];
  if (role === "volunteer") return [...common, ...volunteerItems];
  return [...common, ...donorItems];
};

const ROLE_COLORS = {
  admin: "danger",
  volunteer: "warning",
  donor: "primary",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navItems = getNavItems(user?.role) || 'donor';


  useEffect(() => {
    async function session() {
      const session = await getUser();
      if (session?.user) {
        setUser(session.user)
      }
      else {
        redirect('/login')
      }
    }
    session()
  }, [])

  const handleSignOut = async () => {
    await signOut();
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/70">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 h-16 border-b border-border shrink-0 ${collapsed ? "justify-center px-3" : ""}`}>
        <div className="w-7 h-7 rounded-full bg-wine flex items-center justify-center shrink-0">
          <svg width="12" height="16" viewBox="0 0 14 18" fill="none">
            <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z" fill="white" />
          </svg>
        </div>
        {!collapsed && (
          <span className="font-display text-lg font-semibold text-charcoal tracking-tight">
            Vitae
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={`sidebar-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-3" : ""}`}
            >
              <span className={`sidebar-icon shrink-0 ${isActive ? "text-wine" : "text-ash"}`}>
                <Icon d={ICONS[item.icon]} size={17} />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className={`p-3 border-t border-border shrink-0 ${collapsed ? "flex justify-center" : ""}`}>
        {collapsed ? (
          <Avatar src={user?.avatar} name={user?.name} size="sm" />
        ) : (
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar src={user?.avatar} name={user?.name} size="sm" className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-charcoal truncate">{user?.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Chip
                  size="sm"
                  variant="flat"
                  color={ROLE_COLORS[user?.role] || "default"}
                  className="h-4 text-[10px] px-1.5 capitalize"
                >
                  {user?.role}
                </Chip>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              </div>
            </div>
            <Link href="/login" onClick={handleSignOut}>
              <Button variant="bordered" className="w-full border-border text-slate rounded-xl">
                Log out
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-border h-screen sticky top-0
                    transition-all duration-300 shrink-0 ${collapsed ? "w-16" : "w-60"}`}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[70px] w-6 h-6 rounded-full bg-white border border-border
                     flex items-center justify-center shadow-card hover:bg-cream transition-colors z-10"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d={collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
          </svg>
        </button>

        <SidebarContent />
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-5 left-5 z-50 w-12 h-12 rounded-2xl bg-wine
                   text-white shadow-wine flex items-center justify-center"
      >
        <Icon d={ICONS.menu} size={20} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)} />
          <div className="relative w-60 bg-white h-full shadow-2xl flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                         rounded-lg hover:bg-cream text-ash"
            >
              <Icon d={ICONS.close} size={16} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
