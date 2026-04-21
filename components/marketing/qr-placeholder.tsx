/**
 * Decorative QR placeholder (not scannable) for certificate previews.
 */
export function QrPlaceholder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
    >
      <rect width="120" height="120" fill="white" rx="8" />
      <rect x="8" y="8" width="32" height="32" fill="#0f172a" rx="2" />
      <rect x="80" y="8" width="32" height="32" fill="#0f172a" rx="2" />
      <rect x="8" y="80" width="32" height="32" fill="#0f172a" rx="2" />
      <rect x="48" y="48" width="8" height="8" fill="#0f172a" />
      <rect x="64" y="48" width="8" height="8" fill="#0f172a" />
      <rect x="48" y="64" width="8" height="8" fill="#0f172a" />
      <rect x="72" y="72" width="40" height="40" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <path
        d="M76 76h32v32H76z"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
    </svg>
  );
}
