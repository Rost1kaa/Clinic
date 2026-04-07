import Image from "next/image";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export function LogoMark({
  className,
  alt,
  decorative = false,
  priority = false,
}: {
  className?: string;
  alt?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn("relative block h-12 w-12 shrink-0", className)}>
      <Image
        src="/brand/medservisi.svg"
        alt={decorative ? "" : alt ?? `${siteConfig.name} ლოგო`}
        fill
        sizes="(max-width: 768px) 48px, 64px"
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}

export function BrandLogo({
  className,
  markClassName,
  titleClassName,
  subtitleClassName,
  priority = false,
  showSubtitle = true,
}: {
  className?: string;
  markClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  priority?: boolean;
  showSubtitle?: boolean;
}) {
  return (
    <div className={cn("font-ka-ui flex min-w-0 items-center gap-3.5", className)}>
      <LogoMark className={markClassName} decorative priority={priority} />
      <div className="min-w-0">
        <p className={cn("truncate font-serif text-xl leading-none text-secondary", titleClassName)}>
          {siteConfig.name}
        </p>
        {showSubtitle ? (
          <p className={cn("truncate text-xs font-medium text-muted", subtitleClassName)}>
            {siteConfig.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
