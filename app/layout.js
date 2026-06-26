import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./providers";

// Fonts are loaded via <link> tags (below) so the build works
// in any environment — no network access needed at build time.
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";

export const metadata = {
  title: {
    default: "Vitae - Blood Donation Platform",
    template: "%s | Vitae",
  },
  description:
    "Connect blood donors with recipients across Bangladesh. Give life, save stories.",
  keywords: ["blood donation", "donate blood", "Bangladesh", "donors", "health"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body className="bg-ivory text-charcoal antialiased">
        <Providers>
          {children}
          <Toaster position="bottom right"></Toaster>
        </Providers>
      </body>
    </html>
  );
}
