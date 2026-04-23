export type ServiceMode = "home_visit" | "online_consultation";
export type BookingCategory = "specialty" | "diagnostic" | "laboratory";
export type PaymentMethod = "online" | "onsite";
export type PaymentStatus = "pending" | "paid" | "failed" | "onsite_pending";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";
export type UserRole = "super_admin" | "manager" | "content_editor";

export interface NavigationItem {
  href: string;
  label: string;
  description?: string;
}

export interface HeaderNavigationSection {
  title?: string;
  items: NavigationItem[];
}

export interface HeaderNavigationItem extends NavigationItem {
  items?: NavigationItem[];
  matchHrefs?: string[];
  sections?: HeaderNavigationSection[];
}

export interface MarketingImage {
  src: string;
  alt: string;
  creditUrl?: string;
}

export interface Specialty {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: string;
  carePath: string;
  featured: boolean;
  image?: MarketingImage;
}

export interface Service {
  id: string;
  slug: string;
  specialtySlug?: string;
  name: string;
  summary: string;
  description: string;
  serviceMode: ServiceMode;
  price: number;
  durationMinutes: number;
  featured: boolean;
  requiresAddress: boolean;
  requiresVideoLink: boolean;
  image?: MarketingImage;
  tags: string[];
}

export interface DiagnosticService {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  price: number;
  durationMinutes: number;
  homeAvailable: boolean;
  featured: boolean;
  image?: MarketingImage;
}

export interface LaboratoryService {
  id: string;
  slug: string;
  category: string;
  name: string;
  summary: string;
  description: string;
  price: number;
  durationMinutes: number;
  homeAvailable: boolean;
  featured: boolean;
  image?: MarketingImage;
}

export interface Doctor {
  id: string;
  slug: string;
  fullName: string;
  title: string;
  specialtySlug: string;
  bio: string;
  experienceYears: number;
  languages: string[];
  isFeatured: boolean;
}

export interface AvailabilitySlot {
  id: string;
  startsAt: string;
  endsAt: string;
  serviceType: ServiceMode;
  category: BookingCategory;
  itemId: string;
  doctorId?: string;
  capacity: number;
  status: "available" | "blocked";
}

export interface NewsCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  tags: string[];
  coverImage?: MarketingImage;
  publishedAt: string;
  readingTimeMinutes: number;
  contentMarkdown: string;
  relatedSlugs: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  fullName: string;
  role: string;
  quote: string;
  rating: number;
  location: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ValuePoint {
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  address: string;
  email: string;
  phone: string;
  hours: string[];
}
