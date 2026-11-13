import { ImageResponse } from "next/og";

import { FaviconMarkFrame } from "@/lib/brand/favicon-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<FaviconMarkFrame size={32} padding={4} />, {
    ...size,
  });
}
