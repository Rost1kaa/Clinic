"use client";

import { useInViewOnce } from "@/components/motion/use-in-view-once";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { IconMark } from "@/components/ui/icon-mark";
import { SectionHeader } from "@/components/ui/section-header";
import type { StatItem } from "@/types/domain";

export function HomeTrustStatsSection({
  stats,
}: {
  stats: StatItem[];
}) {
  const { ref, hasEnteredView } = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      className="section-shell bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(236,247,238,0.9)_100%)] pt-0"
    >
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-[linear-gradient(145deg,rgba(251,254,251,0.94),rgba(241,249,242,0.97)_42%,rgba(247,251,248,0.94)_100%)] px-5 py-10 shadow-[0_28px_80px_rgba(10,55,58,0.08)] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(42,200,62,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(42,200,62,0.06),transparent_28%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(42,200,62,0.08)_1px,transparent_1px)] bg-[size:18px_18px] opacity-[0.35] [mask-image:radial-gradient(circle_at_center,black_18%,transparent_78%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-8 top-10 h-24 w-24 rounded-full bg-primary/[0.09] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-6 bottom-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 space-y-10">
            <SectionHeader
              align="center"
              eyebrow="ნდობა და გამოცდილება"
              title="მედსერვისი ციფრებში"
              description="ზრუნვა, გამოცდილება და სანდო მომსახურება ყოველდღიურად."
              className="max-w-2xl"
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.slice(0, 4).map((stat, index) => (
                <ScrollReveal
                  key={stat.label}
                  delay={index * 70}
                  variant="card"
                  className="h-full"
                >
                  <article className="group flex h-full min-w-0 flex-col items-center rounded-[1.55rem] border border-white/80 bg-white/92 px-5 py-6 text-center shadow-[0_14px_36px_rgba(10,55,58,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(10,55,58,0.11)] sm:px-6 sm:py-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-primary/12 bg-primary-soft text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
                      <IconMark name={stat.icon} className="h-5 w-5" />
                    </div>
                    <AnimatedStatValue
                      value={stat.value}
                      start={hasEnteredView}
                      className="mt-5 text-[2.45rem] font-semibold leading-none tracking-[-0.04em] text-secondary sm:text-[2.75rem]"
                    />
                    <p className="mt-3 max-w-[16ch] text-sm font-medium leading-6 text-muted-strong">
                      {stat.label}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
