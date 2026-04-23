"use client";

import { useScrollReveal } from "@/components/motion/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const { ref, revealClassName, revealStyle } = useScrollReveal<HTMLDivElement>({
    variant: "heading",
  });
  const isCentered = align === "center";

  return (
    <div
      ref={ref}
      className={cn(
        "space-y-4",
        revealClassName,
        isCentered && "mx-auto text-center",
        className,
      )}
      style={revealStyle}
    >
      {eyebrow ? <Badge className={cn(isCentered && "mx-auto")}>{eyebrow}</Badge> : null}
      <div className={cn("space-y-3", isCentered && "mx-auto text-center")}>
        <h2
          className={cn(
            "font-serif text-3xl leading-tight text-secondary sm:text-4xl",
            isCentered && "mx-auto text-center",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "text-base leading-7 text-muted sm:text-lg",
              isCentered ? "mx-auto max-w-[42rem] text-center" : "max-w-3xl",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
