import type { QRCodeToDataURLOptions } from "qrcode";

const COLORS = { dark: "#0f172a", light: "#ffffff" };

/**
 * Canonical base URL for verification links embedded in QR codes.
 * When unset, callers should fall back to `window.location.origin`.
 */
export function resolveVerifyOrigin(): string {
  if (typeof window === "undefined") return "";
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return window.location.origin;
}

export function buildVerifyPageUrl(code: string, origin: string): string {
  const base = origin.replace(/\/$/, "");
  const trimmed = code.trim();
  return `${base}/verify?code=${encodeURIComponent(trimmed)}`;
}

/**
 * Full verification URL for embedding in QR codes (client-only).
 * Uses {@link resolveVerifyOrigin} (env override or current host). Returns ""
 * during SSR — callers should only rely on this after mount or in browser handlers.
 */
export function getCertificateVerifyUrl(code: string): string {
  if (typeof window === "undefined") return "";
  const trimmed = code.trim();
  if (!trimmed) return "";
  const origin = resolveVerifyOrigin();
  return buildVerifyPageUrl(trimmed, origin);
}

/** High-res PNG for on-screen display (downscaled via CSS for sharp retina rendering). */
export const VERIFY_QR_SCREEN_OPTIONS: QRCodeToDataURLOptions = {
  width: 480,
  margin: 2,
  errorCorrectionLevel: "H",
  color: COLORS,
};

/** Dense PNG for PDF embedding (printed / zoomed). */
export const VERIFY_QR_PDF_OPTIONS: QRCodeToDataURLOptions = {
  width: 640,
  margin: 2,
  errorCorrectionLevel: "H",
  color: COLORS,
};
