"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const SHOW_AFTER_SCROLL = 240;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateVisibility = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL);
      frameId = 0;
    };

    const onScroll = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="ზემოთ დაბრუნება"
      onClick={handleClick}
      className={cn(
        "fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/55 bg-primary text-white shadow-[0_18px_34px_rgba(37,155,59,0.26)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-strong hover:shadow-[0_22px_40px_rgba(37,155,59,0.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-[1.05rem] w-[1.05rem] sm:h-[1.15rem] sm:w-[1.15rem]" strokeWidth={2.6} />
    </button>
  );
}
