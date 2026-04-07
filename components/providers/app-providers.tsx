"use client";

import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
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
