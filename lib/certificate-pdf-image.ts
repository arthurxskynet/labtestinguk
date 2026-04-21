/** Max blob size when embedding remote images into PDF exports (browser memory). */
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

/**
 * Allowed HTTPS origins for certificate batch/product images embedded in PDFs.
 * Extend when you host assets on additional CDNs (same-origin is always ok).
 */
export function isAllowedCertificateImageUrl(urlStr: string): boolean {
  let url: URL;
  try {
    url = new URL(urlStr.trim());
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost")) return false;
  if (
    typeof window !== "undefined" &&
    url.origin === window.location.origin
  ) {
    return true;
  }
  if (host.endsWith(".supabase.co")) return true;
  if (host.endsWith(".supabase.in")) return true;
  return false;
}

/**
 * Fetch an image and return a data URL suitable for jsPDF `addImage`.
 * Returns null if blocked, too large, non-image, or network/CORS failure.
 */
export async function loadImageDataUrlForPdf(
  urlStr: string,
): Promise<string | null> {
  if (!isAllowedCertificateImageUrl(urlStr)) return null;
  try {
    const res = await fetch(urlStr, {
      mode: "cors",
      credentials: "omit",
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) return null;
    if (blob.size > MAX_IMAGE_BYTES) return null;
    return await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = () => reject(new Error("read failed"));
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
