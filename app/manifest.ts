import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Verifypeps — Independent peptide analysis",
    short_name: "Verifypeps",
    description:
      "HPLC and LC-MS analytical reporting with QR-linked certificate registry lookup. Research-use documentation only.",
    start_url: "/",
    display: "standalone",
    background_color: "#080d14",
    theme_color: "#080d14",
    lang: "en-GB",
    icons: [
      {
        src: "/brand/favicon-square.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/icon-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
