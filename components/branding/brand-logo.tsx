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
        sizes="(max-width: 768px) 64px, 96px"
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
    <div className={cn("font-ka-ui flex min-w-0 items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark className={markClassName} decorative priority={priority} />
      <div className="flex min-w-0 flex-col justify-center self-center gap-px">
        <p
          className={cn(
            "truncate font-ka-ui text-xl font-semibold leading-[1.02] text-secondary tracking-normal",
            titleClassName,
          )}
        >
          {siteConfig.name}
        </p>
        {showSubtitle ? (
          <p
            className={cn(
              "truncate text-xs font-medium leading-[1.08] text-muted tracking-normal",
              subtitleClassName,
            )}
          >
            {siteConfig.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
