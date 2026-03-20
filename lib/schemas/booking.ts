import { z } from "zod";

export const serviceTypeSchema = z.enum(["home_visit", "online_consultation"]);
export const bookingCategorySchema = z.enum(["specialty", "diagnostic", "laboratory"]);
export const preferredCommunicationSchema = z.enum(["phone", "whatsapp", "email"]);
export const paymentMethodSchema = z.enum(["online", "onsite"]);

export const bookingRequestSchema = z
  .object({
    serviceType: serviceTypeSchema,
    category: bookingCategorySchema,
    itemId: z.string().min(1, "აირჩიეთ სერვისი"),
    doctorId: z.string().optional(),
    slotId: z.string().min(1, "აირჩიეთ დრო"),
    fullName: z.string().min(2, "შეიყვანეთ სახელი და გვარი").max(120),
    phone: z.string().min(7, "შეიყვანეთ ტელეფონი").max(32),
    email: z.string().email("შეიყვანეთ სწორი ელფოსტა"),
    address: z.string().max(240).optional(),
    notes: z.string().max(1200).optional(),
    preferredCommunication: preferredCommunicationSchema,
    paymentMethod: paymentMethodSchema,
    consent: z.boolean().refine((value) => value, {
      message: "დადასტურება აუცილებელია",
    }),
    honeypot: z.string().max(0).optional(),
    submittedAt: z.number().int(),
  })
  .superRefine((value, ctx) => {
    if (value.serviceType === "home_visit" && !value.address?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
        message: "მისამართი სავალდებულოა სახლში ვიზიტისთვის",
      });
    }

    if (
      value.serviceType === "online_consultation" &&
      value.category !== "specialty"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["category"],
        message: "ონლაინ კონსულტაცია ამ ეტაპზე ხელმისაწვდომია მხოლოდ სპეციალისტებისთვის",
      });
    }
  });

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
