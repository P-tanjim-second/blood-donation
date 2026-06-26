import Link from "next/link";

const LINKS = {
  Platform: [
    { label: "Donation Requests", href: "/donation-requests" },
    { label: "Search Donors", href: "/search" },
    { label: "Funding", href: "/funding" },
    { label: "Register as Donor", href: "/register" },
  ],
  Support: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Blood Compatibility", href: "/#compatibility" },
    { label: "Emergency Contact", href: "/#contact" },
    { label: "FAQ", href: "/#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const BLOOD_TYPES = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      {/* Blood type marquee strip */}
      <div className="overflow-hidden border-b border-ivory/8 py-3">
        <div className="marquee-track">
          {[...BLOOD_TYPES, ...BLOOD_TYPES, ...BLOOD_TYPES, ...BLOOD_TYPES].map((t, i) => (
            <span key={i} className="font-display text-sm font-medium text-ivory/20 mx-8 shrink-0">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-5 lg:px-10 pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-wine flex items-center justify-center">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C7 0 0 9 0 12.5C0 16.09 3.13 18 7 18C10.87 18 14 16.09 14 12.5C14 9 7 0 7 0Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="font-display text-xl font-semibold text-ivory tracking-tight">
                Vitae
              </span>
            </Link>
            <p className="text-sm text-ivory/50 leading-relaxed max-w-xs">
              Connecting blood donors with those in need across Bangladesh. 
              Every drop counts. Every life matters.
            </p>

            {/* Blood group badges */}
            <div className="flex flex-wrap gap-1.5 mt-6">
              {BLOOD_TYPES.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md border border-ivory/10 text-[11px]
                             font-mono text-ivory/40 hover:border-wine hover:text-wine
                             transition-colors duration-200 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: "X",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map(({ label, svg }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-ivory/10 flex items-center justify-center
                             text-ivory/40 hover:text-ivory hover:border-ivory/30
                             transition-all duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-10">
            {Object.entries(LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-mono tracking-widest uppercase text-ivory/30 mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-ivory/50 hover:text-ivory transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-ivory/8 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-xs text-ivory/25">
            © {new Date().getFullYear()} Vitae. All rights reserved.
          </p>
          <p className="text-xs text-ivory/25">
            Built with ♥ for the people of Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
