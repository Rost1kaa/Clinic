import {
  addDays,
  setHours,
  setMinutes,
  startOfDay,
  subDays,
} from "date-fns";
import type {
  AvailabilitySlot,
  DiagnosticService,
  Doctor,
  FaqItem,
  LaboratoryService,
  NewsCategory,
  NewsPost,
  Service,
  SiteSettings,
  Specialty,
  StatItem,
  ValuePoint,
} from "@/types/domain";

const imagery = {
  telemedicine: {
    src: "https://cdn.pixabay.com/photo/2021/04/10/11/53/telemedicine-6166814_1280.jpg",
    alt: "ექიმის ონლაინ კონსულტაციის ვიზუალი ლეპტოპის ეკრანზე",
    creditUrl: "https://pixabay.com/photos/telemedicine-doctor-laptop-6166814/",
  },
  homeVisit: {
    src: "https://cdn.pixabay.com/photo/2026/02/27/16/09/luxurywellness-home-healthcare-10147143_1280.jpg",
    alt: "ექიმის სახლში ვიზიტი პაციენტთან",
    creditUrl:
      "https://pixabay.com/photos/home-healthcare-doctor-home-visit-10147143/",
  },
  consultation: {
    src: "https://cdn.pixabay.com/photo/2020/11/03/15/31/doctor-5710156_1280.jpg",
    alt: "ექიმების გუნდი კონსულტაციის პროცესში",
    creditUrl: "https://pixabay.com/photos/doctor-patient-consultation-5710156/",
  },
  diagnostics: {
    src: "https://cdn.pixabay.com/photo/2014/10/30/15/49/ultrasound-509396_1280.jpg",
    alt: "დიაგნოსტიკური გამოსახულება მონიტორზე",
    creditUrl: "https://pixabay.com/photos/ultrasound-x-ray-image-hospital-509396/",
  },
  laboratory: {
    src: "https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg",
    alt: "ლაბორატორიული სინჯარები სამედიცინო ტესტირებისთვის",
    creditUrl: "https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg",
  },
  remoteVisit: {
    src: "https://cdn.pixabay.com/photo/2022/10/14/07/43/telemedicine-7520691_640.jpg",
    alt: "ონლაინ ვიზიტი ექიმთან ვიდეოკონსულტაციის ფორმატში",
    creditUrl: "https://cdn.pixabay.com/photo/2022/10/14/07/43/telemedicine-7520691_640.jpg",
  },
};

export const siteSettings: SiteSettings = {
  companyName: "მედსერვისი",
  tagline:
    "სამედიცინო გუნდი, რომელიც თქვენს სახლსა და ციფრულ არხებს ერთნაირი სიზუსტით ემსახურება.",
  address: "თბილისი, ვაჟა-ფშაველას გამზირი 47",
  email: "care@medservice.ge",
  phone: "+995 32 2 58 58 58",
  hours: [
    "ორშაბათი - პარასკევი: 09:00 - 21:00",
    "შაბათი - კვირა: 10:00 - 18:00",
  ],
};

export const stats: StatItem[] = [
  {
    label: "მომსახურებული პაციენტი",
    value: "5000+",
    description: "სახლში ვიზიტისა და დისტანციური ზრუნვის ფართო გამოცდილება.",
    icon: "activity",
  },
  {
    label: "სამედიცინო სპეციალობა",
    value: "10+",
    description: "მულტიდისციპლინური გუნდი სხვადასხვა საჭიროებისთვის.",
    icon: "stethoscope",
  },
  {
    label: "მხარდაჭერა და კოორდინაცია",
    value: "24/7",
    description: "სწრაფი დაკავშირება, დაგეგმვა და უწყვეტი კომუნიკაცია.",
    icon: "phone",
  },
  {
    label: "კმაყოფილი პაციენტი",
    value: "98%",
    description: "მაღალი ნდობა სერვისის ხარისხსა და ყურადღებიან მომსახურებაზე.",
    icon: "heart-handshake",
  },
];

export const valuePoints: ValuePoint[] = [
  {
    title: "ექიმთან საუბარი",
    description: "სწრაფი პასუხი და მარტივი გეგმა.",
    icon: "activity",
  },
  {
    title: "ვიზიტი სახლში",
    description: "ექიმი ან ექთანი თქვენს მისამართზე.",
    icon: "house-plus",
  },
  {
    title: "ონლაინ ჩართვა",
    description: "კონსულტაცია იქიდან, სადაც კომფორტულია.",
    icon: "video",
  },
  {
    title: "უსაფრთხო გზა",
    description: "ყველაფერი გასაგებად და მშვიდად მიდის.",
    icon: "shield-check",
  },
];

export const specialties: Specialty[] = [
  {
    id: "sp-therapist",
    slug: "therapist",
    name: "თერაპევტი",
    summary: "პირველადი შეფასება, მწვავე სიმპტომების მართვა და შემდგომი გეგმა.",
    description:
      "თერაპევტის გუნდი უზრუნველყოფს პაციენტის პირველადი მდგომარეობის შეფასებას, მკურნალობის კოორდინაციასა და საჭიროების შემთხვევაში სპეციალიზებულ მიმართვას.",
    icon: "stethoscope",
    carePath: "სახლში ვიზიტი და ონლაინ შეფასება",
    featured: true,
    image: imagery.consultation,
  },
  {
    id: "sp-cardiologist",
    slug: "cardiologist",
    name: "კარდიოლოგი",
    summary: "გულის რითმის, წნევის და ქრონიკული მართვის შეფასება.",
    description:
      "კარდიოლოგიური მომსახურება მოიცავს კონსულტაციას, ECG/ჰოლტერის კოორდინაციას და მკურნალობის კორექციას.",
    icon: "heart-pulse",
    carePath: "სახლში ECG-თან ერთად",
    featured: true,
  },
  {
    id: "sp-neurologist",
    slug: "neurologist",
    name: "ნევროლოგი",
    summary: "თავის ტკივილი, თავბრუსხვევა, ნევროლოგიური სიმპტომების შეფასება.",
    description:
      "ნევროლოგიური გუნდი მუშაობს როგორც დისტანციურ კონსულტაციებზე, ასევე ვიზიტებზე ქრონიკული ან მწვავე სიმპტომების სამართავად.",
    icon: "brain",
    carePath: "ონლაინ განმეორებითი ვიზიტები",
    featured: true,
  },
  {
    id: "sp-palliative",
    slug: "palliative-care",
    name: "პალიატიური მზრუნველობა",
    summary: "სიმპტომების შემსუბუქება და ოჯახის მხარდაჭერა სახლში.",
    description:
      "პალიატიური გუნდი აერთიანებს ექიმს, ექთანს და გეგმიურ მონიტორინგს ღირსეული და მშვიდი მოვლისთვის.",
    icon: "heart-handshake",
    carePath: "გრძელი მოვლის პროგრამა",
    featured: true,
  },
  {
    id: "sp-endocrinologist",
    slug: "endocrinologist",
    name: "ენდოკრინოლოგი",
    summary: "ჰორმონალური და მეტაბოლური მდგომარეობების მართვა.",
    description:
      "ენდოკრინოლოგიური კონსულტაციები განკუთვნილია დიაბეტის, ფარისებრი ჯირკვლისა და მეტაბოლური დარღვევების კონტროლისთვის.",
    icon: "pill",
    carePath: "ონლაინ კონტროლი და ანალიზების მიმოხილვა",
    featured: true,
  },
  {
    id: "sp-nurse",
    slug: "nurse-home-visit",
    name: "ექთნის სახლში ვიზიტი",
    summary: "ინფუზია, ინექცია, გასინჯვა და მოვლის პროცესის მხარდაჭერა.",
    description:
      "ექთნის გუნდი ასრულებს სამედიცინო მანიპულაციებს, ნიმუშის აღებასა და პაციენტის მდგომარეობის ოპერატიულ მონიტორინგს სახლში.",
    icon: "syringe",
    carePath: "დაგეგმილი და სწრაფი ვიზიტები",
    featured: true,
  },
];

export const services: Service[] = [
  {
    id: "svc-therapist-home",
    slug: "therapist-home-visit",
    specialtySlug: "therapist",
    name: "თერაპევტის სახლში ვიზიტი",
    summary: "მწვავე სიმპტომების შეფასება და მკურნალობის გეგმა თქვენს მისამართზე.",
    description:
      "სერვისი მოიცავს პირველადი შეფასებას, ფიზიკურ გასინჯვას, რეკომენდაციებსა და საჭიროების შემთხვევაში შემდგომი კვლევების დაგეგმვას.",
    serviceMode: "home_visit",
    price: 120,
    durationMinutes: 60,
    featured: true,
    requiresAddress: true,
    requiresVideoLink: false,
    image: imagery.homeVisit,
    tags: ["პირველადი შეფასება", "სახლში ვიზიტი", "ოჯახური მედიცინა"],
  },
  {
    id: "svc-cardiologist-home",
    slug: "cardiologist-home-visit",
    specialtySlug: "cardiologist",
    name: "კარდიოლოგის სახლში ვიზიტი",
    summary: "გულის ჯანმრთელობის შეფასება ECG-თან კომბინირების შესაძლებლობით.",
    description:
      "კარდიოლოგი ადგენს რისკებს, აფასებს სიმპტომებს და აწყობს შემდგომ მართვას სახლში ჩატარებულ დიაგნოსტიკასთან ერთად.",
    serviceMode: "home_visit",
    price: 180,
    durationMinutes: 75,
    featured: true,
    requiresAddress: true,
    requiresVideoLink: false,
    image: imagery.consultation,
    tags: ["კარდიოლოგია", "ECG", "მონიტორინგი"],
  },
  {
    id: "svc-neurologist-online",
    slug: "neurologist-online-consultation",
    specialtySlug: "neurologist",
    name: "ნევროლოგის ონლაინ კონსულტაცია",
    summary: "წინასწარი შეფასება, ანალიზების განხილვა და შემდგომი მართვის რეკომენდაცია.",
    description:
      "ვიდეოკონსულტაციის ფორმატში ექიმი აფასებს სიმპტომების ისტორიას, არსებული კვლევების პასუხებსა და დაგეგმავს მომდევნო ნაბიჯებს.",
    serviceMode: "online_consultation",
    price: 90,
    durationMinutes: 40,
    featured: true,
    requiresAddress: false,
    requiresVideoLink: true,
    image: imagery.telemedicine,
    tags: ["ვიდეო ვიზიტი", "ნევროლოგია", "მეორე აზრი"],
  },
  {
    id: "svc-endocrinologist-online",
    slug: "endocrinologist-online-consultation",
    specialtySlug: "endocrinologist",
    name: "ენდოკრინოლოგის ონლაინ კონსულტაცია",
    summary: "დიაბეტის და ჰორმონალური მდგომარეობების დისტანციური მონიტორინგი.",
    description:
      "სერვისი მოიცავს ანალიზების შეფასებას, მკურნალობის კორექციის განხილვას და ცხოვრების წესის პრაქტიკულ რეკომენდაციებს.",
    serviceMode: "online_consultation",
    price: 95,
    durationMinutes: 40,
    featured: true,
    requiresAddress: false,
    requiresVideoLink: true,
    image: imagery.remoteVisit,
    tags: ["ენდოკრინოლოგია", "ონლაინ მონიტორინგი", "ანალიზები"],
  },
  {
    id: "svc-palliative-home",
    slug: "palliative-home-care-visit",
    specialtySlug: "palliative-care",
    name: "პალიატიური მზრუნველობის ვიზიტი",
    summary: "ტკივილის კონტროლი, სიმპტომური მხარდაჭერა და ოჯახის კონსულტაცია.",
    description:
      "ვიზიტი ეძღვნება პაციენტის კომფორტს, მედიკამენტური მართვის კორექციას და ყოველდღიური მოვლის კოორდინაციას.",
    serviceMode: "home_visit",
    price: 210,
    durationMinutes: 90,
    featured: true,
    requiresAddress: true,
    requiresVideoLink: false,
    image: imagery.homeVisit,
    tags: ["პალიატიური მოვლა", "სახლში ვიზიტი", "ოჯახის მხარდაჭერა"],
  },
  {
    id: "svc-nurse-home",
    slug: "nurse-home-visit",
    specialtySlug: "nurse-home-visit",
    name: "ექთნის სახლში ვიზიტი",
    summary: "ინფუზია, ინექცია, სისხლის აღება და მოვლის მხარდაჭერა.",
    description:
      "ექთანი ახორციელებს მანიპულაციებს, ამოწმებს პარამეტრებს და საჭიროების შემთხვევაში უკავშირდება ექიმს ერთიანი ჩანაწერის ფარგლებში.",
    serviceMode: "home_visit",
    price: 70,
    durationMinutes: 45,
    featured: true,
    requiresAddress: true,
    requiresVideoLink: false,
    image: imagery.homeVisit,
    tags: ["ექთანი", "ინფუზია", "სისხლის აღება"],
  },
];

export const diagnostics: DiagnosticService[] = [
  {
    id: "diag-instrumental",
    slug: "instrumental-diagnostics",
    name: "ინსტრუმენტული დიაგნოსტიკა",
    summary: "მობილური დიაგნოსტიკური პაკეტები ინდივიდუალური საჭიროების მიხედვით.",
    description:
      "კოორდინირებული დიაგნოსტიკური მომსახურება, რომელიც მოიცავს მობილურ აპარატურასა და შედეგების ორგანიზებულ მიწოდებას.",
    price: 150,
    durationMinutes: 60,
    homeAvailable: true,
    featured: true,
    image: imagery.diagnostics,
  },
  {
    id: "diag-ecg",
    slug: "electrocardiography-ecg",
    name: "ელექტროკარდიოგრაფია (ECG)",
    summary: "გულის რითმის სწრაფი და სანდო შეფასება ადგილზე.",
    description:
      "ECG მომსახურება ხელმისაწვდომია სახლში ვიზიტთან ერთად ან ცალკე, კარდიოლოგის რეკომენდაციების ინტეგრაციით.",
    price: 55,
    durationMinutes: 25,
    homeAvailable: true,
    featured: true,
    image: imagery.diagnostics,
  },
  {
    id: "diag-echo",
    slug: "echocardiography",
    name: "ექოკარდიოგრაფია",
    summary: "გულის სტრუქტურული და ფუნქციური შეფასება სპეციალისტის დასკვნით.",
    description:
      "ექოკარდიოგრაფიული კვლევა გამოიყენება სიმპტომების ღრმა შეფასებისთვის და მკურნალობის კორექციის მხარდასაჭერად.",
    price: 165,
    durationMinutes: 45,
    homeAvailable: true,
    featured: true,
    image: imagery.diagnostics,
  },
  {
    id: "diag-ultrasound",
    slug: "abdominal-ultrasound",
    name: "მუცლის ღრუს ულტრაბგერითი კვლევა",
    summary: "ორგანოების არაინვაზიური შეფასება მობილური ულტრაბგერითი აპარატით.",
    description:
      "კვლევა დაგეხმარებათ დიფერენციულ დიაგნოსტიკაში და შემდგომი მართვის სწორად დაგეგმვაში.",
    price: 145,
    durationMinutes: 35,
    homeAvailable: true,
    featured: true,
    image: imagery.diagnostics,
  },
  {
    id: "diag-radiology",
    slug: "radiology-xray",
    name: "რადიოლოგია / X-ray დიაგნოსტიკა",
    summary: "გეგმიური ან მითითებული შემთხვევებისათვის ორგანიზებული რადიოლოგიური მხარდაჭერა.",
    description:
      "პლატფორმა უზრუნველყოფს კვლევის დაჯავშნას, ექიმის რეკომენდაციის და შედეგების კომუნიკაციას ერთიან პროცესში.",
    price: 180,
    durationMinutes: 50,
    homeAvailable: false,
    featured: false,
    image: imagery.consultation,
  },
  {
    id: "diag-holter",
    slug: "holter-monitoring",
    name: "24-საათიანი ჰოლტერ მონიტორინგი",
    summary: "გულის რითმის ხანგრძლივი მონიტორინგი კარდიოლოგიური რისკების შესაფასებლად.",
    description:
      "ჰოლტერის მომსახურება მოიცავს აპარატის დაყენებას, განმარტებას და შემდგომი შეფასების დაგეგმვას.",
    price: 190,
    durationMinutes: 30,
    homeAvailable: true,
    featured: true,
    image: imagery.diagnostics,
  },
];

export const laboratoryServices: LaboratoryService[] = [
  {
    id: "lab-hematology",
    slug: "hematology-panel",
    category: "Hematology",
    name: "ჰემატოლოგიური პანელი",
    summary: "სისხლის საერთო ანალიზი და ჰემატოლოგიური პროფილის საბაზისო შეფასება.",
    description:
      "ნიმუშის აღება შეიძლება სახლში, ხოლო პასუხები უსაფრთხოდ იგზავნება ციფრულ არხებში.",
    price: 35,
    durationMinutes: 20,
    homeAvailable: true,
    featured: true,
    image: imagery.laboratory,
  },
  {
    id: "lab-biochemistry",
    slug: "biochemistry-panel",
    category: "Biochemistry",
    name: "ბიოქიმიური პანელი",
    summary: "ღვიძლის, თირკმლისა და მეტაბოლური მაჩვენებლების შეფასება.",
    description:
      "ბიოქიმიური პანელი გამოიყენება როგორც პირველადი სკრინინგისთვის, ისე ქრონიკული მდგომარეობების მონიტორინგისთვის.",
    price: 55,
    durationMinutes: 20,
    homeAvailable: true,
    featured: true,
    image: imagery.laboratory,
  },
  {
    id: "lab-immunology",
    slug: "immunology-panel",
    category: "Immunology",
    name: "იმუნოლოგიური პანელი",
    summary: "იმუნური პასუხის და სპეციფიკური ინდიკატორების შეფასება.",
    description:
      "შერჩეული იმუნოლოგიური ტესტები ხელმისაწვდომია ექიმის მითითებითა და შედეგების განხილვის მხარდაჭერით.",
    price: 85,
    durationMinutes: 20,
    homeAvailable: true,
    featured: false,
    image: imagery.laboratory,
  },
  {
    id: "lab-coagulation",
    slug: "coagulation-panel",
    category: "Coagulation",
    name: "კოაგულაციის პანელი",
    summary: "სისხლის შედედების მაჩვენებლების კონტროლი სპეციალისტის მითითებით.",
    description:
      "განსაკუთრებით მნიშვნელოვანია ანტიკოაგულაციური თერაპიის ან ოპერაციული მზადების პროცესში.",
    price: 48,
    durationMinutes: 20,
    homeAvailable: true,
    featured: true,
    image: imagery.laboratory,
  },
];

export const doctors: Doctor[] = [
  {
    id: "doc-ketevan-gelashvili",
    slug: "ketevan-gelashvili",
    fullName: "ქეთევან გელაშვილი",
    title: "თერაპევტი, ოჯახის ექიმი",
    specialtySlug: "therapist",
    bio: "პირველადი შეფასებისა და ქრონიკული მდგომარეობების მართვის 12-წლიანი გამოცდილებით.",
    experienceYears: 12,
    languages: ["ქართული", "ინგლისური", "რუსული"],
    isFeatured: true,
  },
  {
    id: "doc-lasha-bakradze",
    slug: "lasha-bakradze",
    fullName: "ლაშა ბაქრაძე",
    title: "კარდიოლოგი",
    specialtySlug: "cardiologist",
    bio: "გულის რიტმის დარღვევებისა და ამბულატორიული კარდიოლოგიის პრაქტიკოსი.",
    experienceYears: 14,
    languages: ["ქართული", "ინგლისური"],
    isFeatured: true,
  },
  {
    id: "doc-ana-kharadze",
    slug: "ana-kharadze",
    fullName: "ანა ხარაძე",
    title: "ნევროლოგი",
    specialtySlug: "neurologist",
    bio: "თავის ტკივილის, ვესტიბულარული და ქრონიკული ნევროლოგიური სიმპტომების მართვაში გამოცდილებით.",
    experienceYears: 11,
    languages: ["ქართული", "ინგლისური"],
    isFeatured: true,
  },
  {
    id: "doc-nino-lomidze",
    slug: "nino-lomidze",
    fullName: "ნინო ლომიძე",
    title: "პალიატიური მზრუნველობის სპეციალისტი",
    specialtySlug: "palliative-care",
    bio: "სახლში მოვლის პროგრამებს კოორდინაციას უწევს პაციენტისა და ოჯახის საჭიროებებზე ფოკუსით.",
    experienceYears: 16,
    languages: ["ქართული", "რუსული"],
    isFeatured: true,
  },
  {
    id: "doc-giorgi-abadze",
    slug: "giorgi-abadze",
    fullName: "გიორგი აბაძე",
    title: "ენდოკრინოლოგი",
    specialtySlug: "endocrinologist",
    bio: "დიაბეტის და თირეოიდული დარღვევების დისტანციური მონიტორინგის პრაქტიკით.",
    experienceYears: 9,
    languages: ["ქართული", "ინგლისური"],
    isFeatured: true,
  },
  {
    id: "doc-mariam-tsiklauri",
    slug: "mariam-tsiklauri",
    fullName: "მარიამ წიკლაური",
    title: "უფროსი ექთანი",
    specialtySlug: "nurse-home-visit",
    bio: "ინფუზიური თერაპიის, ნიმუშის აღებისა და სახლში გეგმიური მოვლის გამოცდილებით.",
    experienceYears: 10,
    languages: ["ქართული"],
    isFeatured: true,
  },
];

const referenceDay = startOfDay(new Date());

function slotTime(dayOffset: number, hours: number, minutes = 0) {
  return setMinutes(setHours(addDays(referenceDay, dayOffset), hours), minutes);
}

export const availabilitySlots: AvailabilitySlot[] = [
  {
    id: "slot-therapist-home-1",
    startsAt: slotTime(1, 10).toISOString(),
    endsAt: slotTime(1, 11).toISOString(),
    serviceType: "home_visit",
    category: "specialty",
    itemId: "svc-therapist-home",
    doctorId: "doc-ketevan-gelashvili",
    capacity: 1,
    status: "available",
  },
  {
    id: "slot-cardiologist-home-1",
    startsAt: slotTime(1, 13).toISOString(),
    endsAt: slotTime(1, 14, 15).toISOString(),
    serviceType: "home_visit",
    category: "specialty",
    itemId: "svc-cardiologist-home",
    doctorId: "doc-lasha-bakradze",
    capacity: 1,
    status: "available",
  },
  {
    id: "slot-neuro-online-1",
    startsAt: slotTime(2, 11).toISOString(),
    endsAt: slotTime(2, 11, 40).toISOString(),
    serviceType: "online_consultation",
    category: "specialty",
    itemId: "svc-neurologist-online",
    doctorId: "doc-ana-kharadze",
    capacity: 1,
    status: "available",
  },
  {
    id: "slot-endo-online-1",
    startsAt: slotTime(2, 17).toISOString(),
    endsAt: slotTime(2, 17, 40).toISOString(),
    serviceType: "online_consultation",
    category: "specialty",
    itemId: "svc-endocrinologist-online",
    doctorId: "doc-giorgi-abadze",
    capacity: 1,
    status: "available",
  },
  {
    id: "slot-palliative-home-1",
    startsAt: slotTime(3, 10).toISOString(),
    endsAt: slotTime(3, 11, 30).toISOString(),
    serviceType: "home_visit",
    category: "specialty",
    itemId: "svc-palliative-home",
    doctorId: "doc-nino-lomidze",
    capacity: 1,
    status: "available",
  },
  {
    id: "slot-nurse-home-1",
    startsAt: slotTime(1, 16).toISOString(),
    endsAt: slotTime(1, 16, 45).toISOString(),
    serviceType: "home_visit",
    category: "specialty",
    itemId: "svc-nurse-home",
    doctorId: "doc-mariam-tsiklauri",
    capacity: 2,
    status: "available",
  },
  {
    id: "slot-ecg-home-1",
    startsAt: slotTime(2, 9).toISOString(),
    endsAt: slotTime(2, 9, 30).toISOString(),
    serviceType: "home_visit",
    category: "diagnostic",
    itemId: "diag-ecg",
    capacity: 2,
    status: "available",
  },
  {
    id: "slot-echo-home-1",
    startsAt: slotTime(3, 12).toISOString(),
    endsAt: slotTime(3, 12, 45).toISOString(),
    serviceType: "home_visit",
    category: "diagnostic",
    itemId: "diag-echo",
    capacity: 1,
    status: "available",
  },
  {
    id: "slot-lab-bio-home-1",
    startsAt: slotTime(1, 8, 30).toISOString(),
    endsAt: slotTime(1, 9).toISOString(),
    serviceType: "home_visit",
    category: "laboratory",
    itemId: "lab-biochemistry",
    capacity: 3,
    status: "available",
  },
  {
    id: "slot-lab-hema-home-1",
    startsAt: slotTime(2, 8, 30).toISOString(),
    endsAt: slotTime(2, 9).toISOString(),
    serviceType: "home_visit",
    category: "laboratory",
    itemId: "lab-hematology",
    capacity: 3,
    status: "available",
  },
];

export const newsCategories: NewsCategory[] = [
  {
    id: "news-cat-updates",
    slug: "updates",
    name: "განახლებები",
    description: "კლინიკური სერვისების და პლატფორმის მნიშვნელოვანი სიახლეები.",
  },
  {
    id: "news-cat-prevention",
    slug: "prevention",
    name: "პრევენცია",
    description: "პრაქტიკული რჩევები ყოველდღიური ჯანმრთელობისთვის.",
  },
  {
    id: "news-cat-digital-care",
    slug: "digital-care",
    name: "ციფრული მოვლა",
    description: "ონლაინ კონსულტაციისა და ციფრული პროცესების შესახებ.",
  },
];

export const newsPosts: NewsPost[] = [
  {
    id: "news-home-cardiology",
    slug: "home-cardiology-ecg-launch",
    title: "სახლში კარდიოლოგიური ვიზიტი უკვე ECG მხარდაჭერით",
    excerpt:
      "მედსერვისმა განაახლა კარდიოლოგიური სერვისი, რათა სახლში ვიზიტს ECG და შემდგომი შეფასების ერთიანი პროცესი დაუმატოს.",
    categorySlug: "updates",
    tags: ["კარდიოლოგია", "სახლში ვიზიტი", "ECG"],
    coverImage: imagery.homeVisit,
    publishedAt: subDays(new Date(), 4).toISOString(),
    readingTimeMinutes: 4,
    featured: true,
    relatedSlugs: ["how-online-follow-up-works", "home-lab-safety-checklist"],
    contentMarkdown: `## რა შეიცვალა

ახლა პაციენტს შეუძლია კარდიოლოგის ვიზიტთან ერთად **ECG მომსახურებაც** ერთ ჯავშანში დაგეგმოს. ეს ამცირებს ლოდინის დროს და ექიმს აძლევს მეტ კონტექსტს იგივე ვიზიტის ფარგლებში.

## ვის გამოადგება

- პაციენტებს მაღალი არტერიული წნევით
- გულის რითმის ცვლილებების ეპიზოდების მქონე ადამიანებს
- მათ, ვისაც სჭირდება მიმდინარე მკურნალობის შეფასება სახლში

## როგორ მუშაობს

1. პაციენტი ირჩევს სახლში ვიზიტს
2. ჯავშნის დროს ამატებს დიაგნოსტიკურ კვლევას
3. გუნდი ადასტურებს ვიზიტს და სლოტს
4. შედეგები გადაეცემა დოკუმენტირებული შეჯამებით`,
  },
  {
    id: "news-online-follow-up",
    slug: "how-online-follow-up-works",
    title: "როგორ მუშაობს ონლაინ განმეორებითი კონსულტაცია",
    excerpt:
      "ონლაინ ვიზიტი საუკეთესოა მაშინ, როდესაც უკვე გაქვთ ანალიზები, წინა დასკვნები ან გჭირდებათ თერაპიის კორექცია სახლიდან გამოსვლის გარეშე.",
    categorySlug: "digital-care",
    tags: ["ონლაინ კონსულტაცია", "ვიდეო ვიზიტი"],
    coverImage: imagery.telemedicine,
    publishedAt: subDays(new Date(), 7).toISOString(),
    readingTimeMinutes: 3,
    featured: true,
    relatedSlugs: ["home-cardiology-ecg-launch"],
    contentMarkdown: `## როდის არის ონლაინ ვიზიტი კარგი არჩევანი

ონლაინ კონსულტაცია ეფექტურია მაშინ, როცა საჭიროა:

- მიმდინარე სიმპტომების განხილვა
- ანალიზების პასუხების შეფასება
- მედიკამენტური სქემის გადახედვა

## რას ამზადებს პაციენტი

წინასწარ გამოგზავნილი ანალიზები, მიმდინარე წამლების სია და მოკლე აღწერა, თუ რა შეიცვალა ბოლო ვიზიტის შემდეგ.

## შემდეგი ნაბიჯები

საჭიროების შემთხვევაში ექიმი გირჩევთ დამატებით კვლევებს ან სახლში ვიზიტს.`,
  },
  {
    id: "news-home-lab-checklist",
    slug: "home-lab-safety-checklist",
    title: "სახლში ლაბორატორიული მომსახურების უსაფრთხო ჩექლისტი",
    excerpt:
      "ნიმუშის აღებამდე მცირე მომზადება ხელს უწყობს პროცესის სიზუსტესა და პაციენტის კომფორტს.",
    categorySlug: "prevention",
    tags: ["ლაბორატორია", "სახლში მომსახურება"],
    coverImage: imagery.laboratory,
    publishedAt: subDays(new Date(), 10).toISOString(),
    readingTimeMinutes: 5,
    featured: false,
    relatedSlugs: ["home-cardiology-ecg-launch"],
    contentMarkdown: `## მარტივი წესები

- შეინარჩუნეთ წყლის მიღება, თუ ექიმმა სხვა მითითება არ მოგცათ
- მოამზადეთ პირადობის დოკუმენტი და წინა პასუხები
- დააფიქსირეთ მედიკამენტები, რომლებსაც იღებთ

## რატომ არის ეს მნიშვნელოვანი

სწორი მომზადება ამცირებს გადადების ან განმეორებითი აღების საჭიროებას და აუმჯობესებს შედეგების ინტერპრეტაციას.`,
  },
  {
    id: "news-palliative-support",
    slug: "palliative-support-at-home",
    title: "პალიატიური მზრუნველობა სახლში: რას მოიცავს პროგრამა",
    excerpt:
      "პროგრამა აერთიანებს სიმპტომურ კონტროლს, ოჯახის მხარდაჭერას და გეგმიურ ვიზიტებს ღირსეული ყოველდღიურობისთვის.",
    categorySlug: "updates",
    tags: ["პალიატიური მოვლა", "სახლში ვიზიტი"],
    coverImage: imagery.homeVisit,
    publishedAt: subDays(new Date(), 12).toISOString(),
    readingTimeMinutes: 6,
    featured: false,
    relatedSlugs: ["home-lab-safety-checklist"],
    contentMarkdown: `## პროგრამის საფუძველი

პალიატიური მხარდაჭერა არა მხოლოდ სიმპტომების შემცირებას, არამედ **ოჯახის ინფორმირებულობასა და პროცესის დაგეგმვას** ეხმარება.

## რას მოიცავს

- ექიმის ვიზიტი
- ექთნის რეგულარული ჩართვა
- მედიკამენტური სქემის გადახედვა
- ოჯახის წევრების პრაქტიკული ინსტრუქცია`,
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "როგორ დავჯავშნო სახლში ვიზიტი?",
    answer:
      "აირჩიეთ დაჯავშნის გვერდი, მიუთითეთ სახლში ვიზიტი, მომსახურების კატეგორია, სასურველი სერვისი და ხელმისაწვდომი სლოტი. მისამართის ველი გამოჩნდება მხოლოდ ამ რეჟიმისთვის.",
  },
  {
    id: "faq-2",
    question: "ონლაინ კონსულტაციისთვის რა მჭირდება?",
    answer:
      "საჭიროა სტაბილური ინტერნეტი, ელფოსტა ან ტელეფონი კომუნიკაციისთვის და, სურვილისამებრ, წინასწარ გამოგზავნილი კვლევების პასუხები.",
  },
  {
    id: "faq-3",
    question: "შემიძლია გადავიხადო ადგილზე?",
    answer:
      "დიახ. დაჯავშნის ბოლო ეტაპზე შეგიძლიათ აირჩიოთ ან ონლაინ გადახდა, ან ადგილზე გადახდის რეჟიმი.",
  },
  {
    id: "faq-4",
    question: "როგორ იცავთ ჩემს მონაცემებს?",
    answer:
      "პაციენტის მონაცემები მუშავდება უსაფრთხო არქიტექტურით, როლებზე დაფუძნებული წვდომითა და სერვერულად ვალიდირებული ფორმებით.",
  },
  {
    id: "faq-5",
    question: "დიაგნოსტიკა ყველა სერვისისთვის სახლშია ხელმისაწვდომი?",
    answer:
      "არა. თითოეულ დიაგნოსტიკურ სერვისს აქვს ხელმისაწვდომობის საკუთარი რეჟიმი. დაჯავშნის ფორმა ავტომატურად აჩვენებს მხოლოდ შესაბამის ვარიანტებს.",
  },
  {
    id: "faq-6",
    question: "როდის დამიკავშირდებით ჯავშნის შემდეგ?",
    answer:
      "სამუშაო საათებში ჩვეულებრივ 15 წუთზე ნაკლებ დროში გიკავშირდებით დასადასტურებლად ან დამატებითი ინფორმაციის მისაღებად.",
  },
];
