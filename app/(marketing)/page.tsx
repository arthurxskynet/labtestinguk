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
  title: "Peptide verification & testing",
  description:
    "Independent UK laboratory HPLC and LC-MS verification with QR-linked digital certificates. Research-use documentation and secure Lab Portal.",
  openGraph: {
    title: "Verifypeps — Peptide verification & testing",
    description:
      "HPLC purity, LC-MS identity, and tamper-aware certificate verification for research laboratories.",
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
