import type { Metadata } from "next";

import { ContactFormSection } from "@/components/marketing/contact-form-section";
import { CtaBannerSection } from "@/components/marketing/cta-banner-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { NewsletterSection } from "@/components/marketing/newsletter-section";
import { UkLabHighlightsSection } from "@/components/marketing/uk-lab-highlights-section";
import { ReviewsSection } from "@/components/marketing/reviews-section";
import { StatsBarSection } from "@/components/marketing/stats-bar-section";
import { VerifySection } from "@/components/marketing/verify-section";

export const metadata: Metadata = {
  title: "Peptide analytical testing & documentation",
  description:
    "Independent UK-coordinated HPLC and LC-MS testing with EU partner-lab capacity where required. QR-linked certificate registry lookup. Research-use documentation only.",
  openGraph: {
    title: "Verifypeps — Peptide analytical testing & documentation",
    description:
      "HPLC and LC-MS reporting with registry-linked certificates for research laboratories.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VerifySection />
      <StatsBarSection />
      <UkLabHighlightsSection />
      <HowItWorksSection />
      <ReviewsSection />
      <ContactFormSection />
      <CtaBannerSection />
      <NewsletterSection />
    </>
  );
}
