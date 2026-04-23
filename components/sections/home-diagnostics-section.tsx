import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { IconMark } from "@/components/ui/icon-mark";

const diagnosticCards = [
  {
    id: "instrumental-diagnostics",
    title: "ინსტრუმენტული დიაგნოსტიკა",
    icon: "stethoscope",
    blurb: "თანმიმდევრული ინსტრუმენტული შეფასება სწრაფი გადაწყვეტილებისთვის.",
  },
  {
    id: "electrocardiography-ecg",
    title: "ელექტროკარდიოგრაფია (ECG)",
    icon: "heart-pulse",
    blurb: "გულის რიტმის სუფთა და სწრაფი საბაზისო შეფასება ერთ სივრცეში.",
  },
  {
    id: "echocardiography",
    title: "ექოკარდიოგრაფია",
    icon: "activity",
    blurb: "გულის სტრუქტურისა და ფუნქციის მშვიდი ვიზუალური კვლევა.",
  },
  {
    id: "abdominal-ultrasound",
    title: "მუცლის ღრუს ულტრაბგერითი კვლევა",
    icon: "microscope",
    blurb: "მუცლის ღრუს ორგანოების მკაფიო და კოორდინირებული დაკვირვება.",
  },
  {
    id: "radiology-xray",
    title: "რადიოლოგია / X-ray დიაგნოსტიკა",
    icon: "shield-check",
    blurb: "სწრაფი რადიოლოგიური გადაღება ზუსტი პირველადი შეფასებისთვის.",
  },
  {
    id: "holter-monitoring",
    title: "24-საათიანი ჰოლტერ მონიტორინგი",
    icon: "clock-3",
    blurb: "დღიური მონიტორინგი რიტმის ცვლილებების უფრო სრულ სურათად.",
  },
] as const;

export function HomeDiagnosticsSection() {
  return (
    <section className="section-shell bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(236,247,238,0.72)_100%)] pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="container-shell space-y-12 sm:space-y-14">
        <SectionHeader
          eyebrow="დიაგნოსტიკა"
          title="კვლევები სწრაფი შეფასებისა და კოორდინირებული მართვისთვის"
          description="კარდიოლოგიური, ულტრაბგერითი და ინსტრუმენტული კვლევები ერთ სუფთა სივრცეშია თავმოყრილი, რომ არჩევა სწრაფი, მშვიდი და მკაფიო იყოს."
          align="center"
          className="max-w-[46rem] space-y-5"
        />

        <div className="grid auto-rows-fr gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-5">
          {diagnosticCards.map((item, index) => (
            <ScrollReveal
              key={item.id}
              delay={index * 60}
              variant="card"
              className="h-full"
            >
              <article className="group relative flex h-full min-w-0 flex-col rounded-[2rem] border border-white/85 bg-white px-7 py-6 shadow-[0_24px_56px_rgba(10,55,58,0.07)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(10,55,58,0.11)] sm:px-8 sm:py-7">
                <div
                  className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(42,200,62,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_44%)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-5 right-0 h-[4.5rem] w-[4.5rem] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(236,247,238,0.72)_100%)] shadow-[0_0_0_16px_rgba(255,255,255,0.96)]"
                  aria-hidden
                />

                <div className="relative z-10 flex h-full min-w-0 flex-col">
                  <h3 className="max-w-[15ch] break-words font-serif text-[1.56rem] font-semibold leading-[1.08] tracking-[-0.03em] text-secondary [overflow-wrap:anywhere] [text-wrap:balance] sm:text-[1.72rem]">
                    {item.title}
                  </h3>

                  <div className="mt-7 flex justify-start">
                    <div className="flex h-[5.6rem] w-[5.6rem] items-center justify-center rounded-full border border-primary/10 bg-primary-soft text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_14px_30px_rgba(42,200,62,0.1)]">
                      <IconMark name={item.icon} className="h-12 w-12" />
                    </div>
                  </div>

                  <div className="mt-7 flex-1 border-t border-[#E5E7EB] pt-5 pr-16 pb-16">
                    <p className="max-w-[28ch] text-[0.98rem] leading-7 text-muted">
                      {item.blurb}
                    </p>
                  </div>

                  <Link
                    href="/booking"
                    className="absolute bottom-4 right-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-white text-secondary shadow-[0_10px_24px_rgba(10,55,58,0.08)] transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                    aria-label={`${item.title} - დაჯავშნა`}
                  >
                    <IconMark name="arrow-right" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
