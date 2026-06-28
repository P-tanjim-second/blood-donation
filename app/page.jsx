import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const DynamicHeroSection = dynamic(() => import("@/components/sections/HeroSection"));
const DynamicStatsSection = dynamic(() => import("@/components/sections/StatsSection"));
const DynamicFeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"));
const DynamicUrgentRequestsSection = dynamic(() => import("@/components/sections/UrgentRequestsSection"));
const DynamicSearchCTASection = dynamic(() => import("@/components/sections/ContactSection").then(mod => mod.SearchCTASection));
const DynamicContactSection = dynamic(() => import("@/components/sections/ContactSection").then(mod => mod.ContactSection));

export const metadata = {
  title: "Vitae - Give Life, Save Stories",
  description: "Connect blood donors with recipients across Bangladesh. Verified donors, instant matching, zero cost.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <DynamicHeroSection />
        <DynamicStatsSection />
        <DynamicFeaturesSection />
        <DynamicUrgentRequestsSection />
        <DynamicSearchCTASection />
        <DynamicContactSection />
      </main>
      <Footer />
    </>
  );
}
