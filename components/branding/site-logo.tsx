import Image from "next/image";

import { cn } from "@/lib/utils";

const LOGO_SIZES = {
  sm: { width: 140, height: 94 },
  md: { width: 172, height: 115 },
  lg: { width: 208, height: 139 },
} as const;

type LogoSize = keyof typeof LOGO_SIZES;

type SiteLogoProps = {
  size?: LogoSize;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function SiteLogo({
  size = "md",
  className,
  imageClassName,
  priority = false,
}: SiteLogoProps) {
  const dimensions = LOGO_SIZES[size];

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/brand/logo-rect.png"
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        alt="Verifypeps"
        className={cn("h-auto w-full max-w-full", imageClassName)}
      />
    </span>
  );
}
