import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { IconMark } from "@/components/ui/icon-mark";

const diagnosticCards = [
  {
    id: "instrumental-diagnostics",
    title: "ინსტრუმენტული დიაგნოსტიკა",
    icon: "stethoscope",
    blurb: "სწრაფი და ზუსტი ინსტრუმენტული შეფასება",
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
    <section className="section-shell bg-background pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="container-shell space-y-12 sm:space-y-14">
        <SectionHeader
          eyebrow="დიაგნოსტიკა"
          title="ზუსტი დიაგნოსტიკა სწრაფად"
          description="ყველა ძირითადი კვლევა ერთ სივრცეში."
          align="center"
          className="max-w-[46rem] space-y-5"
        />

        <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {diagnosticCards.map((item, index) => (
            <ScrollReveal
              key={item.id}
              delay={index * 60}
              variant="card"
              className="h-full"
            >
              <article className="relative flex h-[21rem] min-w-0 flex-col overflow-visible rounded-[28px] bg-white p-8 shadow-[0_24px_56px_rgba(10,55,58,0.07)] transition-all duration-300 ease-out hover:shadow-[0_32px_72px_rgba(10,55,58,0.11)]">
                <div className="relative z-[3] flex min-w-0 items-start justify-between gap-6">
                  <h3 className="max-w-[15ch] break-words font-serif text-[26px] font-semibold leading-[1.08] text-[#102b35] [overflow-wrap:anywhere] [text-wrap:balance] lg:max-w-[220px] xl:max-w-[240px]">
                    {item.title}
                  </h3>

                  <div className="flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center rounded-full bg-[#7df36b] text-[#102b35]">
                    <IconMark
                      name={item.icon}
                      className={item.id === "electrocardiography-ecg" ? "h-8 w-8" : "h-9 w-9"}
                    />
                  </div>
                </div>

                <div className="relative z-[3] mt-auto border-t border-[#d8ded8] pt-5 pr-16">
                  <p className="max-w-[28ch] text-[0.98rem] leading-7 text-[#5f6f72]">
                    {item.blurb}
                  </p>
                </div>

                <div className="absolute -right-px -bottom-px w-[76px] h-[57px] bg-background rounded-tl-[31px] z-[2]" />

                <a
                  href="#"
                  className="group/button absolute right-0 -bottom-[10px] z-[5] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white text-[#102b35] no-underline shadow-sm transition-all duration-300 ease-out hover:scale-105"
                  aria-label="Open service"
                >
                  <span className="absolute inset-0 translate-y-full bg-[#7df36b] transition-transform duration-500 ease-out group-hover/button:translate-y-0" />
                  <span className="relative z-10 text-[#102b35]">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </span>
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
