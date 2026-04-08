"use client";

import { SpecialtyNavTile } from "@/components/sections/specialty-nav-tile";
import { ManualSlider } from "@/components/ui/manual-slider";
import type { Specialty } from "@/types/domain";

export function SpecialtiesNavRail({ specialties }: { specialties: Specialty[] }) {
  if (!specialties.length) {
    return null;
  }

  return (
    <div className="pt-4">
      <ManualSlider
        className="relative overflow-hidden"
        viewportClassName="snap-x snap-mandatory px-3 pt-5 pb-7 sm:px-12 lg:px-14"
        trackClassName="gap-4 sm:gap-5"
        fadeWidthClassName="w-12 lg:w-16"
        previousLabel="წინა სპეციალობები"
        nextLabel="შემდეგი სპეციალობები"
      >
        {specialties.map((specialty) => (
          <SpecialtyNavTile key={specialty.id} specialty={specialty} />
        ))}
      </ManualSlider>
    </div>
  );
}
