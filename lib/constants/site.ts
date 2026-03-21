import type { HeaderNavigationItem, NavigationItem } from "@/types/domain";

export const siteConfig = {
  name: "Velora Care",
  legalName: "Velora Care Medical Group",
  shortDescription:
    "სანდო სამედიცინო მხარდაჭერა სახლში, ონლაინ და დიაგნოსტიკის სრულ სპექტრში.",
  phone: "+995 32 2 58 58 58",
  email: "care@velora.ge",
  address: "თბილისი, ვაჟა-ფშაველას გამზირი 47",
  hours: [
    "ორშაბათი - პარასკევი: 09:00 - 21:00",
    "შაბათი - კვირა: 10:00 - 18:00",
  ],
  emergencyNote:
    "გადაუდებელი მდგომარეობის შემთხვევაში დაუყოვნებლივ მიმართეთ 112-ს.",
};

export const mainNavigation: NavigationItem[] = [
  { href: "/", label: "საწყისი" },
  { href: "/services", label: "სერვისები" },
  { href: "/specialties", label: "სპეციალობები" },
  { href: "/diagnostics", label: "დიაგნოსტიკა" },
  { href: "/laboratory", label: "ლაბორატორია" },
  { href: "/news", label: "სიახლეები" },
  { href: "/about", label: "ჩვენ შესახებ" },
  { href: "/contact", label: "კონტაქტი" },
  { href: "/booking", label: "დაჯავშნა" },
];

export const headerNavigation: HeaderNavigationItem[] = [
  { href: "/", label: "საწყისი" },
  {
    href: "/services",
    label: "სერვისები",
    items: [
      { href: "/services#home-visit", label: "ბინაზე მომსახურება" },
      { href: "/services#online-consultation", label: "ონლაინ კონსულტაცია" },
    ],
  },
  {
    href: "/specialties",
    label: "სპეციალობები",
    items: [
      { href: "/specialties/therapist", label: "თერაპევტი" },
      { href: "/specialties/cardiologist", label: "კარდიოლოგი" },
      { href: "/specialties/neurologist", label: "ნევროლოგი" },
      { href: "/specialties/endocrinologist", label: "ენდოკრინოლოგი" },
      { href: "/specialties/palliative-care", label: "პალიატიური სპეციალისტი" },
      { href: "/specialties/nurse-home-visit", label: "ექთანი ბინაზე" },
    ],
  },
  {
    href: "/diagnostics",
    label: "დიაგნოსტიკა",
    items: [
      { href: "/diagnostics#electrocardiography-ecg", label: "ელექტროკარდიოგრაფია" },
      { href: "/diagnostics#echocardiography", label: "ექოკარდიოსკოპია" },
      { href: "/diagnostics#abdominal-ultrasound", label: "მუცლის ექოსკოპია" },
      { href: "/diagnostics#radiology-xray", label: "რენტგენოლოგია" },
      { href: "/diagnostics#holter-monitoring", label: "ჰოლტერის მონიტორინგი" },
      { href: "/diagnostics#instrumental-diagnostics", label: "ინსტრუმენტული კვლევები" },
    ],
  },
  { href: "/laboratory", label: "ლაბორატორია" },
];

export const footerNavigation: NavigationItem[] = [
  { href: "/faq", label: "ხშირად დასმული კითხვები" },
  { href: "/privacy-policy", label: "კონფიდენციალურობა" },
  { href: "/terms", label: "წესები და პირობები" },
];

export const adminNavigation: NavigationItem[] = [
  { href: "/admin", label: "Dashboard", description: "სწრაფი მიმოხილვა" },
  { href: "/admin/bookings", label: "Bookings", description: "ჯავშნები და სტატუსები" },
  { href: "/admin/catalog", label: "Catalog", description: "ექიმები და სერვისები" },
  { href: "/admin/news", label: "News", description: "სტატიები და განახლებები" },
  {
    href: "/admin/availability",
    label: "Availability",
    description: "დროის ფანჯრები",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "ანგარიში და უსაფრთხოება",
  },
];

export const bookingSteps = [
  "სერვისის ტიპი",
  "კატეგორია",
  "სერვისის არჩევა",
  "თარიღი და დრო",
  "პაციენტის ინფორმაცია",
  "გადახდა",
  "დადასტურება",
] as const;
