import { z } from "zod";

export const adminNewsPostSchema = z.object({
  category_id: z.string().uuid().optional().or(z.literal("")),
  title_ka: z
    .string()
    .trim()
    .min(4, "სათაური მინიმუმ 4 სიმბოლოსგან უნდა შედგებოდეს.")
    .max(160, "სათაური ძალიან გრძელია."),
  excerpt_ka: z
    .string()
    .trim()
    .min(12, "აღწერა მინიმუმ 12 სიმბოლოსგან უნდა შედგებოდეს.")
    .max(240, "აღწერა ძალიან გრძელია."),
  tags: z.string().trim().max(180, "თეგების ველი ძალიან გრძელია.").optional(),
  content_markdown: z
    .string()
    .trim()
    .min(40, "სტატიის შინაარსი მინიმუმ 40 სიმბოლოსგან უნდა შედგებოდეს."),
  is_published: z.boolean(),
});

export const adminProfileSettingsSchema = z.object({
  display_name: z
    .string()
    .trim()
    .min(2, "სახელი მინიმუმ 2 სიმბოლოსგან უნდა შედგებოდეს.")
    .max(80, "სახელი ძალიან გრძელია."),
});

export const adminPasswordSettingsSchema = z
  .object({
    current_password: z
      .string()
      .min(1, "შეიყვანეთ მიმდინარე პაროლი."),
    new_password: z
      .string()
      .min(8, "ახალი პაროლი მინიმუმ 8 სიმბოლოსგან უნდა შედგებოდეს."),
    confirm_password: z
      .string()
      .min(8, "დაადასტურეთ ახალი პაროლი."),
  })
  .refine((value) => value.new_password === value.confirm_password, {
    path: ["confirm_password"],
    message: "ახალი პაროლები ერთმანეთს არ ემთხვევა.",
  })
  .refine((value) => value.current_password !== value.new_password, {
    path: ["new_password"],
    message: "ახალი პაროლი მიმდინარე პაროლისგან განსხვავებული უნდა იყოს.",
  });
