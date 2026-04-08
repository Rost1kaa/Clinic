"use client";

import { Children, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, TransitionEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type LoopingCarouselProps = {
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
  autoplayDelay?: number;
};

const TRANSITION_DURATION_MS = 620;
const ARROW_BUTTON_CLASSNAME =
  "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200/70 bg-white/85 text-primary shadow-[0_8px_18px_rgba(12,46,18,0.06)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.05] hover:bg-white hover:text-primary-strong hover:shadow-[0_12px_24px_rgba(12,46,18,0.08)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] sm:h-11 sm:w-11";

export function LoopingCarousel({
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
  autoplayDelay = 2000,
}: LoopingCarouselProps) {
  const slides = Children.toArray(children);
  const cloneCount = slides.length;
  const carouselSlides = useMemo(() => {
    if (slides.length <= 1) {
      return slides;
    }

    return [...slides.slice(-cloneCount), ...slides, ...slides.slice(0, cloneCount)];
  }, [slides, cloneCount]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const autoplayTimerRef = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(() =>
    slides.length > 1 ? cloneCount : 0,
  );
  const [slideSpan, setSlideSpan] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track || slides.length <= 1) {
      return;
    }

    const syncMetrics = () => {
      const firstRealSlide = slideRefs.current[cloneCount];
      const lastRealSlide = slideRefs.current[cloneCount + slides.length - 1];

      if (!firstRealSlide || !lastRealSlide) {
        return;
      }

      const computedTrackStyle = window.getComputedStyle(track);
      const gap =
        parseFloat(computedTrackStyle.columnGap || computedTrackStyle.gap || "0") || 0;
      const nextSlideSpan = firstRealSlide.offsetWidth + gap;
      const contentWidth =
        lastRealSlide.offsetLeft - firstRealSlide.offsetLeft + lastRealSlide.offsetWidth;

      setSlideSpan(nextSlideSpan);
      setHasOverflow(contentWidth > viewport.clientWidth + 4);
    };

    syncMetrics();

    const resizeObserver = new ResizeObserver(syncMetrics);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
    };
  }, [cloneCount, slides.length]);

  useEffect(() => {
    if (!hasOverflow || slides.length <= 1 || isPaused) {
      if (autoplayTimerRef.current !== null) {
        window.clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }

      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    autoplayTimerRef.current = window.setInterval(() => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);
      setCurrentIndex((index) => index + 1);
    }, autoplayDelay);

    return () => {
      if (autoplayTimerRef.current !== null) {
        window.clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [autoplayDelay, hasOverflow, isAnimating, isPaused, slides.length]);

  const move = (direction: -1 | 1) => {
    if (!hasOverflow || isAnimating || slides.length <= 1) {
      return;
    }

    setIsAnimating(true);
    setCurrentIndex((index) => index + direction);
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== trackRef.current) {
      return;
    }

    if (slides.length <= 1) {
      setIsAnimating(false);
      return;
    }

    const minIndex = cloneCount;
    const maxIndex = cloneCount + slides.length - 1;

    if (currentIndex > maxIndex) {
      setIsTransitionEnabled(false);
      setCurrentIndex(minIndex);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          setIsAnimating(false);
        });
      });

      return;
    }

    if (currentIndex < minIndex) {
      setIsTransitionEnabled(false);
      setCurrentIndex(maxIndex);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          setIsAnimating(false);
        });
      });

      return;
    }

    setIsAnimating(false);
  };

  if (!slides.length) {
    return null;
  }

  return (
    <div
      className={cn("space-y-4", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {hasOverflow ? (
        <div className="flex items-center justify-end gap-2 px-1 sm:px-2">
          <button
            type="button"
            aria-label={previousLabel}
            onClick={() => move(-1)}
            className={cn(ARROW_BUTTON_CLASSNAME, buttonClassName)}
          >
            <ChevronLeft className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" strokeWidth={2.2} />
          </button>

          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => move(1)}
            className={cn(ARROW_BUTTON_CLASSNAME, buttonClassName)}
          >
            <ChevronRight className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" strokeWidth={2.2} />
          </button>
        </div>
      ) : null}

      <div className="relative">
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

        <div
          ref={viewportRef}
          className={cn("overflow-hidden", viewportClassName)}
        >
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className={cn(
              "flex w-max items-stretch will-change-transform",
              slideSpan > 0 ? "opacity-100" : "opacity-0",
              trackClassName,
            )}
            style={{
              transform: `translate3d(${-currentIndex * slideSpan}px, 0, 0)`,
              transitionDuration: isTransitionEnabled ? `${TRANSITION_DURATION_MS}ms` : "0ms",
              transitionProperty: "transform",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {carouselSlides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                className={cn("shrink-0", slideClassName)}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
