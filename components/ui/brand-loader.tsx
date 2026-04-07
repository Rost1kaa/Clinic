"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/branding/brand-logo";
import { cn } from "@/lib/utils/cn";

const DOT_STATES = [".", "..", "..."] as const;

export function BrandLoader({
  className,
  fullScreen = true,
}: {
  className?: string;
  fullScreen?: boolean;
}) {
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDotIndex((current) => (current + 1) % DOT_STATES.length);
    }, 430);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn("font-ka-ui relative isolate overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(42,200,62,0.12),transparent_24rem),radial-gradient(circle_at_bottom_right,rgba(191,165,113,0.1),transparent_18rem),linear-gradient(180deg,rgba(248,252,248,0.96),rgba(242,248,243,0.98))]" />

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-lg flex-col items-center justify-center px-6 py-16 text-center",
          fullScreen ? "min-h-screen" : "min-h-[18rem]",
        )}
      >
        <div className="loader-fade-in relative mb-6">
          <div className="loader-breathe absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
          <LogoMark
            className="relative h-20 w-20 drop-shadow-[0_20px_36px_rgba(42,200,62,0.18)]"
            alt="მედსერვისის ლოგო"
            priority
          />
        </div>

        <div className="loader-fade-in space-y-3" style={{ animationDelay: "80ms" }}>
          <p className="font-serif text-[1.95rem] leading-none text-secondary sm:text-[2.2rem]">
            მედსერვისი
            <span className="inline-block min-w-[2.2ch] text-primary">{DOT_STATES[dotIndex]}</span>
          </p>
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
          <p className="text-sm text-muted">იტვირთება</p>
        </div>

        <span className="sr-only">მიმდინარეობს ჩატვირთვა</span>
      </div>
    </div>
  );
}
