"use client";

import * as React from "react";
import { useScrollReveal } from "@/components/motion/scroll-reveal";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { ref, revealClassName, revealStyle } = useScrollReveal<HTMLDivElement>({
    variant: "card",
  });

  return (
    <div
      ref={ref}
      className={cn("surface-card min-w-0 overflow-hidden", revealClassName, className)}
      style={{ ...revealStyle, ...style }}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 space-y-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("break-words font-serif text-xl leading-snug text-secondary", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("min-w-0 break-words text-sm leading-6 text-muted", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 space-y-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 flex flex-wrap items-center gap-3", className)} {...props} />;
}
