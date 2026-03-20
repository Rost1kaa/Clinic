import { format } from "date-fns";

export function formatMoney(value: number) {
  return new Intl.NumberFormat("ka-GE", {
    style: "currency",
    currency: "GEL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string | Date) {
  return format(new Date(date), "dd.MM.yyyy");
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), "dd.MM.yyyy, HH:mm");
}

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function clampText(value: string, max = 140) {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max - 1).trim()}…`;
}
