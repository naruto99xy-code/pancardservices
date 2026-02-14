import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ReprintServices from "@/components/home/ReprintServices";
import CorrectionServices from "@/components/home/CorrectionServices";
import NewPanServices from "@/components/home/NewPanServices";
import SpecialServices from "@/components/home/SpecialServices";
import CancelPanSection from "@/components/home/CancelPanSection";
import HowItWorks from "@/components/HowItWorks";
import WhyApplyThroughUs from "@/components/home/WhyApplyThroughUs";
import DocumentsRequired from "@/components/home/DocumentsRequired";
import PricingSection from "@/components/home/PricingSection";
import TrustStats from "@/components/home/TrustStats";
import GovernmentCompliance from "@/components/home/GovernmentCompliance";
import FAQSection from "@/components/home/FAQSection";
import TrackApplicationCTA from "@/components/home/TrackApplicationCTA";
import ContactSupport from "@/components/home/ContactSupport";
import QuickLinks from "@/components/home/QuickLinks";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Services Overview (All 8 services) */}
      <ServicesOverview />

      {/* 3. Reprint / Reissue / Duplicate */}
      <ReprintServices />

      {/* 4. Corrections */}
      <CorrectionServices />

      {/* 5. New PAN */}
      <NewPanServices />

      {/* 6. Special Services */}
      <SpecialServices />

      {/* 7. Cancel / Surrender */}
      <CancelPanSection />

      {/* 8. How It Works (5 steps) */}
      <HowItWorks />

      {/* 9. Why Apply Through Us */}
      <WhyApplyThroughUs />

      {/* 10. Documents Required */}
      <DocumentsRequired />

      {/* 11. Pricing / Fees */}
      <PricingSection />

      {/* 12. Trust & Stats */}
      <TrustStats />

      {/* 13. Government Compliance & Security */}
      <GovernmentCompliance />

      {/* 14. FAQ */}
      <FAQSection />

      {/* 15. Track Application */}
      <TrackApplicationCTA />

      {/* 16. Contact & Support */}
      <ContactSupport />

      {/* 17. Quick Links */}
      <QuickLinks />

      {/* 18. Final CTA */}
      <FinalCTA />
    </Layout>
  );
};

export default Index;
