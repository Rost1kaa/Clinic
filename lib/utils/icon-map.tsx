import {
  Activity,
  ArrowRight,
  Brain,
  CalendarDays,
  Clock3,
  FlaskConical,
  HeartHandshake,
  HeartPulse,
  HousePlus,
  Mail,
  MapPin,
  Microscope,
  Newspaper,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Video,
} from "lucide-react";

export function renderIcon(name: string, className?: string) {
  switch (name) {
    case "arrow-right":
      return <ArrowRight className={className} />;
    case "brain":
      return <Brain className={className} />;
    case "calendar-days":
      return <CalendarDays className={className} />;
    case "clock-3":
      return <Clock3 className={className} />;
    case "flask":
      return <FlaskConical className={className} />;
    case "heart-handshake":
      return <HeartHandshake className={className} />;
    case "heart-pulse":
      return <HeartPulse className={className} />;
    case "house-plus":
      return <HousePlus className={className} />;
    case "mail":
      return <Mail className={className} />;
    case "map-pin":
      return <MapPin className={className} />;
    case "microscope":
      return <Microscope className={className} />;
    case "newspaper":
      return <Newspaper className={className} />;
    case "phone":
      return <Phone className={className} />;
    case "pill":
      return <Pill className={className} />;
    case "shield-check":
      return <ShieldCheck className={className} />;
    case "stethoscope":
      return <Stethoscope className={className} />;
    case "syringe":
      return <Syringe className={className} />;
    case "video":
      return <Video className={className} />;
    case "activity":
    default:
      return <Activity className={className} />;
  }
}
