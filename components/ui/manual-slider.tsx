"use client";

import { Children, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ManualSliderProps = {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  buttonClassName?: string;
  fadeClassName?: string;
  fadeWidthClassName?: string;
  previousLabel?: string;
  nextLabel?: string;
  showEdgeFades?: boolean;
};

export function ManualSlider({
  children,
  className,
  viewportClassName,
  trackClassName,
  slideClassName,
  buttonClassName,
  fadeClassName,
  fadeWidthClassName,
  previousLabel = "წინა სლაიდები",
  nextLabel = "შემდეგი სლაიდები",
  showEdgeFades = true,
}: ManualSliderProps) {
  const slides = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    let frameId = 0;

    const syncControls = () => {
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
      const nextHasOverflow = maxScrollLeft > 6;

      setHasOverflow(nextHasOverflow);
      setCanScrollPrev(viewport.scrollLeft > 6);
      setCanScrollNext(viewport.scrollLeft < maxScrollLeft - 6);
      frameId = 0;
    };

    const requestSync = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncControls);
    };

    requestSync();

    viewport.addEventListener("scroll", requestSync, { passive: true });

    const resizeObserver = new ResizeObserver(requestSync);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      viewport.removeEventListener("scroll", requestSync);
      resizeObserver.disconnect();

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [slides.length]);

  const scrollToSlide = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const trackOffset = track.offsetLeft;
    const targets = slideRefs.current
      .map((slide) => (slide ? Math.max(0, slide.offsetLeft - trackOffset) : null))
      .filter((value): value is number => value !== null)
      .sort((a, b) => a - b);

    if (!targets.length) {
      return;
    }

    const currentScroll = viewport.scrollLeft;
    const threshold = 12;
    let targetScrollLeft = currentScroll;

    if (direction === 1) {
      targetScrollLeft =
        targets.find((target) => target > currentScroll + threshold) ?? maxScrollLeft;
    } else {
      const previousTargets = targets.filter((target) => target < currentScroll - threshold);
      targetScrollLeft = previousTargets.at(-1) ?? 0;
    }

    viewport.scrollTo({
      left: Math.max(0, Math.min(targetScrollLeft, maxScrollLeft)),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!slides.length) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      {showEdgeFades ? (
        <>
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-14 bg-gradient-to-r sm:block",
              fadeWidthClassName,
              fadeClassName ?? "from-background via-background/92 to-transparent",
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-14 bg-gradient-to-l sm:block",
              fadeWidthClassName,
              fadeClassName ?? "from-background via-background/92 to-transparent",
            )}
            aria-hidden
          />
        </>
      ) : null}

      <div
        ref={viewportRef}
        className={cn(
          "scrollbar-hidden overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-gutter:stable_both-edges]",
          viewportClassName,
        )}
      >
        <div ref={trackRef} className={cn("flex w-max items-stretch gap-4", trackClassName)}>
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={cn("shrink-0 snap-start", slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {hasOverflow ? (
        <>
          <button
            type="button"
            aria-label={previousLabel}
            onClick={() => scrollToSlide(-1)}
            disabled={!canScrollPrev}
            className={cn(
              "absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border border-primary/20 bg-white/88 text-primary shadow-[0_10px_24px_rgba(42,200,62,0.14)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary/28 hover:bg-white hover:text-primary-strong active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-35 sm:left-3 sm:h-11 sm:w-11",
              buttonClassName,
            )}
          >
            <ChevronLeft className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" strokeWidth={2.2} />
          </button>

          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => scrollToSlide(1)}
            disabled={!canScrollNext}
            className={cn(
              "absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border border-primary/20 bg-white/88 text-primary shadow-[0_10px_24px_rgba(42,200,62,0.14)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary/28 hover:bg-white hover:text-primary-strong active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-35 sm:right-3 sm:h-11 sm:w-11",
              buttonClassName,
            )}
          >
            <ChevronRight className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" strokeWidth={2.2} />
          </button>
        </>
      ) : null}
    </div>
  );
}
