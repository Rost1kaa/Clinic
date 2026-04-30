"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    }

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "1rem",
            border: "1px solid rgba(184, 215, 190, 0.7)",
            background: "rgba(255,255,255,0.92)",
            color: "#123436",
          },
        }}
      />
    </>
  );
}
