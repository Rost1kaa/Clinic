"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { SpecialtyNavTile } from "@/components/sections/specialty-nav-tile";
import type { Specialty } from "@/types/domain";

export function SpecialtiesNavRail({ specialties }: { specialties: Specialty[] }) {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(28);

  useEffect(() => {
    const element = groupRef.current;
    if (!element) {
      return;
    }

    const syncMetrics = () => {
      const width = element.offsetWidth;
      setDistance(width);
      setDuration(Math.max(width / 28, 26));
    };

    syncMetrics();

    const observer = new ResizeObserver(syncMetrics);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [specialties.length]);

  if (!specialties.length) {
    return null;
  }

  return (
    <div className="pt-4">
      <div className="marquee-shell relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-background via-background/92 to-transparent sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-10 bg-gradient-to-l from-background via-background/92 to-transparent sm:block" />

        <div className="px-1 pt-5 pb-7">
          <div
            className="marquee-track flex w-max will-change-transform"
            style={
              {
                "--marquee-distance": `${distance}px`,
                "--marquee-duration": `${duration}s`,
              } as CSSProperties
            }
          >
            <div ref={groupRef} className="flex w-max gap-4 pr-4 sm:gap-5 sm:pr-5">
              {specialties.map((specialty) => (
                <SpecialtyNavTile key={specialty.id} specialty={specialty} />
              ))}
            </div>

            <div aria-hidden="true" className="flex w-max gap-4 pr-4 sm:gap-5 sm:pr-5">
              {specialties.map((specialty, index) => (
                <SpecialtyNavTile
                  key={`${specialty.id}-duplicate-${index}`}
                  specialty={specialty}
                  tabIndex={-1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
