import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import { Providers } from "@/app/providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://verifypeps.com"),
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
      className={`${inter.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full scroll-pt-20 scroll-smooth bg-background font-sans text-foreground">
        <Providers>
          <div className="flex min-h-full flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
