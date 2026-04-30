"use client";

import { useScrollReveal } from "@/components/motion/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  panelClassName,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  panelClassName?: string;
}) {
  const { ref, revealClassName, revealStyle } = useScrollReveal<HTMLDivElement>({
    variant: "hero",
  });

  return (
    <section className="section-shell">
      <div className="container-shell">
        <div
          ref={ref}
          className={cn("mesh-panel p-8 sm:p-10 lg:p-14", revealClassName, panelClassName)}
          style={revealStyle}
        >
          <div className="max-w-3xl space-y-6">
            <Badge variant="accent">{eyebrow}</Badge>
            <div className="space-y-4">
              <h1 className="font-serif text-4xl leading-tight text-secondary sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted">{description}</p>
            </div>
            {actions ? (
              <div className="flex flex-wrap items-center gap-3">{actions}</div>
            ) : (
              <Button asChild variant="secondary">
                <a href="/booking">ახლავე დაჯავშნა</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
