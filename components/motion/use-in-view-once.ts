"use client";

import * as React from "react";

export function useInViewOnce<T extends Element>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}: {
  threshold?: number;
  rootMargin?: string;
} = {}) {
  const ref = React.useRef<T | null>(null);
  const [hasEnteredView, setHasEnteredView] = React.useState(false);

  React.useEffect(() => {
    if (hasEnteredView) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasEnteredView(true);
      return;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = node.getBoundingClientRect();
    const isInitiallyVisible = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

    if (isInitiallyVisible) {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          setHasEnteredView(true);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasEnteredView, rootMargin, threshold]);

  return { ref, hasEnteredView };
}
