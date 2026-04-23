import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Instrument_Serif } from "next/font/google";

import { Providers } from "@/app/providers";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D14",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://verifypeps.com"),
  icons: {
    icon: [{ url: "/brand/favicon-square.png", type: "image/png" }],
    shortcut: ["/brand/favicon-square.png"],
    apple: [{ url: "/brand/favicon-square.png" }],
  },
  title: {
    default:
      "Peptide Verification & Testing UK | HPLC & LC-MS Certificates | Verifypeps",
    template: "%s | Verifypeps",
  },
  description:
    "HPLC purity and LC-MS identity testing with QR-verified digital certificates. Independent UK laboratory analysis you can trust.",
  openGraph: {
    title:
      "Peptide Verification & Testing UK | HPLC & LC-MS Certificates | Verifypeps",
    description:
      "Independent third-party verification with HPLC analysis, mass spectrometry, and QR-verified certificates.",
    url: "https://verifypeps.com",
    siteName: "Verifypeps",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${dmMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full scroll-pt-20 scroll-smooth bg-[var(--bg-base)] font-sans text-[var(--text-secondary)] antialiased">
        <Providers>
          <div className="flex min-h-full flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
