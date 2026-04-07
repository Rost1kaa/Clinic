"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

type RevealVariant = "card" | "heading" | "hero" | "panel";

const revealVariantStyles: Record<
  RevealVariant,
  {
    offset: string;
    duration: string;
    scale: string;
  }
> = {
  card: {
    offset: "0.85rem",
    duration: "520ms",
    scale: "0.985",
  },
  heading: {
    offset: "0.75rem",
    duration: "500ms",
    scale: "1",
  },
  hero: {
    offset: "1.1rem",
    duration: "640ms",
    scale: "0.99",
  },
  panel: {
    offset: "0.95rem",
    duration: "560ms",
    scale: "0.99",
  },
};

type RevealPhase = "idle" | "hidden" | "visible";

export function useScrollReveal<T extends HTMLElement>({
  delay = 0,
  variant = "card",
}: {
  delay?: number;
  variant?: RevealVariant;
} = {}) {
  const ref = React.useRef<T | null>(null);
  const [phase, setPhase] = React.useState<RevealPhase>("idle");

  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("visible");
      return;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = node.getBoundingClientRect();
    const isInitiallyVisible = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

    if (isInitiallyVisible) {
      setPhase("visible");
      return;
    }

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          setPhase("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const variantStyle = revealVariantStyles[variant];
  const revealClassName =
    phase === "idle"
      ? ""
      : cn("reveal-transition", phase === "hidden" ? "reveal-hidden" : "reveal-visible");
  const revealStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-offset": variantStyle.offset,
    "--reveal-duration": variantStyle.duration,
    "--reveal-scale": variantStyle.scale,
  } as React.CSSProperties;

  return { ref, revealClassName, revealStyle };
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "card",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const { ref, revealClassName, revealStyle } = useScrollReveal<HTMLDivElement>({
    delay,
    variant,
  });

  return (
    <div ref={ref} className={cn(revealClassName, className)} style={revealStyle}>
      {children}
    </div>
  );
}
