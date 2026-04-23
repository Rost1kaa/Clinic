"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

function parseAnimatedValue(value: string) {
  const match = value.match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const fractionDigits = numericPart.includes(".") ? numericPart.split(".")[1].length : 0;

  return {
    prefix,
    suffix,
    target: Number(numericPart),
    fractionDigits,
  };
}

function formatAnimatedValue(
  parsed: NonNullable<ReturnType<typeof parseAnimatedValue>>,
  currentValue: number,
) {
  const formattedNumber =
    parsed.fractionDigits > 0
      ? currentValue.toFixed(parsed.fractionDigits)
      : Math.round(currentValue).toString();

  return `${parsed.prefix}${formattedNumber}${parsed.suffix}`;
}

export function AnimatedStatValue({
  value,
  start,
  duration = 1400,
  className,
}: {
  value: string;
  start: boolean;
  duration?: number;
  className?: string;
}) {
  const parsed = React.useMemo(() => parseAnimatedValue(value), [value]);
  const [hasMounted, setHasMounted] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState(value);
  const hasAnimatedRef = React.useRef(false);

  React.useEffect(() => {
    setHasMounted(true);
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  React.useEffect(() => {
    if (!hasMounted || !parsed || start || prefersReducedMotion || hasAnimatedRef.current) {
      return;
    }

    setDisplayValue(formatAnimatedValue(parsed, 0));
  }, [hasMounted, parsed, prefersReducedMotion, start]);

  React.useEffect(() => {
    if (!hasMounted) {
      return;
    }

    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    if (!start || hasAnimatedRef.current) {
      return;
    }

    if (prefersReducedMotion) {
      hasAnimatedRef.current = true;
      setDisplayValue(value);
      return;
    }

    hasAnimatedRef.current = true;
    setDisplayValue(formatAnimatedValue(parsed, 0));

    let frameId = 0;
    const animationStart = performance.now();

    const animate = (now: number) => {
      const elapsed = now - animationStart;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = parsed.target * easedProgress;

      setDisplayValue(formatAnimatedValue(parsed, nextValue));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      setDisplayValue(value);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, hasMounted, parsed, prefersReducedMotion, start, value]);

  return (
    <>
      <span
        aria-hidden="true"
        suppressHydrationWarning
        className={cn(className)}
      >
        {hasMounted ? displayValue : value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
