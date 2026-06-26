import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import UrgentRequestsSection from "@/components/sections/UrgentRequestsSection";
import { SearchCTASection, ContactSection } from "@/components/sections/ContactSection";

export const metadata = {
  title: "Vitae — Give Life, Save Stories",
  description: "Connect blood donors with recipients across Bangladesh. Verified donors, instant matching, zero cost.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UrgentRequestsSection />
        <SearchCTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
