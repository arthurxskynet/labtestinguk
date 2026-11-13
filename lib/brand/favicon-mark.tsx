/** Shared Verifypeps mark for favicon / PWA icon generation (ImageResponse). */
export function FaviconMark({ markSize = 24 }: { markSize?: number }) {
  return (
    <svg
      width={markSize}
      height={markSize}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 24 L12.5 16.5 L18 11 L24 6"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="24" r="3.75" fill="#00c4b4" />
      <circle cx="12.5" cy="16.5" r="3.75" fill="#00c4b4" />
      <circle cx="18" cy="11" r="3.75" fill="#00c4b4" />
      <circle cx="24" cy="6" r="4.25" stroke="#00c4b4" strokeWidth="2.25" fill="#080d14" />
      <path
        d="M22.2 6.2 L24 8.4 L27.1 4.2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FaviconMarkFrame({
  size,
  padding = 0,
}: {
  size: number;
  padding?: number;
}) {
  const markSize = size - padding * 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080d14",
      }}
    >
      <FaviconMark markSize={markSize} />
    </div>
  );
}
