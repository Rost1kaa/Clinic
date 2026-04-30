import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ServiceOptionCard } from "@/components/services/service-option-card";
import { getCatalogData } from "@/lib/data/public";
import type { DiagnosticService } from "@/types/domain";
import { formatMoney } from "@/lib/utils/format";
import { buildMetadata } from "@/lib/utils/metadata";
import LaboratoryPage from "@/app/(site)/laboratory/page";

export const metadata = buildMetadata({
  title: "დიაგნოსტიკა",
  path: "/diagnostics",
});

const diagnosticsCardContent: Record<
  string,
  {
    description: string;
    serviceLine: string;
    duration: string;
    availability: string;
  }
> = {
  "instrumental-diagnostics": {
    description: "მობილური დიაგნოსტიკა და შედეგების ორგანიზებული მიწოდება.",
    serviceLine: "დიაგნოსტიკური პაკეტი ინდივიდუალური საჭიროებისთვის",
    duration: "60 წუთი",
    availability: "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც.",
  },
  "electrocardiography-ecg": {
    description: "გულის რითმის სწრაფი შეფასება ადგილზე.",
    serviceLine: "ECG კვლევა სწრაფი შეფასებისთვის",
    duration: "25 წუთი",
    availability: "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც.",
  },
  echocardiography: {
    description: "გულის ფუნქციის და სტრუქტურის შეფასება სპეციალისტის დასკვნით.",
    serviceLine: "ექოკარდიოგრაფიული შეფასება",
    duration: "45 წუთი",
    availability: "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც.",
  },
  "abdominal-ultrasound": {
    description: "მუცლის ღრუს ორგანოების სწრაფი ულტრაბგერითი შეფასება.",
    serviceLine: "მუცლის ღრუს ულტრაბგერითი კვლევა",
    duration: "35 წუთი",
    availability: "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც.",
  },
  "radiology-xray": {
    description: "რადიოლოგიური კვლევის კოორდინაცია ერთ პროცესში.",
    serviceLine: "X-ray კვლევის ორგანიზებული მხარდაჭერა",
    duration: "50 წუთი",
    availability: "საჭიროებს წინასწარ კოორდინაციას.",
  },
  "holter-monitoring": {
    description: "გულის რითმის ხანგრძლივი მონიტორინგი ყოველდღიურ რეჟიმში.",
    serviceLine: "24-საათიანი ჰოლტერ მონიტორინგი",
    duration: "30 წუთი",
    availability: "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც.",
  },
};

function getDiagnosticServices(item: DiagnosticService) {
  const content = diagnosticsCardContent[item.slug];

  return [content.serviceLine, content.duration, content.availability];
}

export default async function DiagnosticsPage() {
  const { diagnostics } = await getCatalogData();

  return (
    <>
      <section className="section-shell pb-0">
        <div className="container-shell">
          <div className="research-block-grid">
            <a href="#instrumental" className="research-block research-block--instrumental">
              <span>ინსტრუმენტული კვლევა</span>
            </a>
            <a href="#laboratory" className="research-block research-block--laboratory">
              <span>ლაბორატიული კვლევა</span>
            </a>
          </div>
        </div>
      </section>
      <div id="instrumental" className="scroll-mt-28">
        <section className="section-shell">
          <div className="container-shell space-y-6">
            <h2 className="font-serif text-3xl leading-tight text-secondary sm:text-4xl flex justify-center">
              ინსტრუმენტული კვლევა
            </h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {diagnostics.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 70} variant="card" className="h-full">
                  <ServiceOptionCard
                    id={item.slug}
                    className="scroll-mt-28 border-0 shadow-none"
                    price={formatMoney(item.price)}
                    title={item.name}
                    description={diagnosticsCardContent[item.slug].description}
                    services={getDiagnosticServices(item)}
                    detailHref={`/diagnostics#${item.slug}`}
                    bookingHref="/booking"
                    plainServices
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div id="laboratory" className="scroll-mt-28">
        <LaboratoryPage />
      </div>
    </>
  );
}
