import { ServicesPage } from "@/components/services/services-page";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "სერვისები",
  description:
    "აირჩიეთ ბინაზე ვიზიტი, ონლაინ მომსახურება, სპეციალისტი ან მზა პაკეტი მკაფიო ფასებით და წინასწარ ცნობილი პირობებით.",
  path: "/services",
});

export default function ServicesRoutePage() {
  return <ServicesPage />;
}
