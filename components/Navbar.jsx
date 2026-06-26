"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";
import { getUser } from "@/lib/api/user/user";

const NAV_LINKS = [
  { label: "Donation Requests", href: "/donation-requests" },
  { label: "Search Donors", href: "/search" },
  { label: "Funding", href: "/funding" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    async function session() {
      const session = await getUser();
      if (session?.user) {
        setLoggedIn(true)
        setUser(session.user)
      }
      else {
        setLoggedIn(false);
      }
    }
    session();
  }, [])

  const isHero = pathname === "/";

  useEffect(() => {
    if (!isHero) {
      setScrolled(true);
      return;
    }
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isHero]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled
          ? "bg-ivory/90 backdrop-blur-[14px] border-b border-border shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-8xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMenuOpen(false)}>
              <div className="w-8 h-8 rounded-full bg-wine flex items-center justify-center
                            group-hover:bg-wine-dark transition-colors duration-200 shadow-wine-sm">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                  <path d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z"
                    fill="white" />
                  <path d="M4 13.5C4 13.5 3 15 5 15.5" stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-display text-xl font-semibold text-charcoal tracking-tight">
                Vitae
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${pathname === link.href
                    ? "text-wine bg-wine/6"
                    : "text-slate hover:text-charcoal hover:bg-parchment/60"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-3">
              {loggedIn ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <button className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                      <Avatar
                        src={user.avatar}
                        name={user.name}
                        size="sm"
                        className="cursor-pointer ring-2 ring-border"
                        isBordered
                        color="primary"
                      />
                      <div className="hidden lg:block text-left">
                        <p className="text-xs font-semibold text-charcoal leading-tight">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-ash capitalize">{user.role}</p>
                      </div>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions" className="min-w-[180px]">
                    <DropdownItem key="dashboard" textValue="Dashboard">
                      <Link href="/dashboard" className="block w-full">
                        Dashboard
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="profile" textValue="Profile">
                      <Link href="/dashboard/profile" className="block w-full">
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" className="text-danger"
                      textValue="Logout">
                      <Link href="/login" onClick={handleSignOut} className="block w-full">
                        Log out
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="light" size="sm" className="text-slate font-medium">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-wine text-white font-medium px-5 rounded-full hover:bg-wine-dark transition-colors shadow-wine-sm"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-charcoal transition-all duration-250 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-5 h-0.5 bg-charcoal transition-all duration-250 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-charcoal transition-all duration-250 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-ivory border-b border-border transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
        >
          <nav className="px-5 pt-4 pb-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === link.href
                  ? "text-wine bg-wine/8"
                  : "text-slate hover:text-charcoal hover:bg-cream"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
              {loggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{user.name}</p>
                      <p className="text-xs text-ash capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-wine text-white rounded-xl font-medium">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="bordered" className="w-full border-border text-slate rounded-xl">
                      Log out
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="bordered" className="w-full border-border rounded-xl text-slate">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-wine text-white rounded-xl font-medium">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
