"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { BookingSummary } from "@/components/booking/booking-summary";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { bookingSteps } from "@/lib/constants/site";
import { bookingRequestSchema, type BookingRequestInput } from "@/lib/schemas/booking";
import type {
  AvailabilitySlot,
  DiagnosticService,
  Doctor,
  LaboratoryService,
  Service,
  Specialty,
} from "@/types/domain";
import { formatDateTime, formatMoney } from "@/lib/utils/format";

type BookingCatalogProps = {
  services: Service[];
  diagnostics: DiagnosticService[];
  laboratoryServices: LaboratoryService[];
  specialties: Specialty[];
  doctors: Doctor[];
  availabilitySlots: AvailabilitySlot[];
};

type BookingItem = Service | DiagnosticService | LaboratoryService;

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="break-words text-sm leading-6 text-danger">{message}</p>;
}

export function BookingForm({
  services,
  diagnostics,
  laboratoryServices,
  specialties,
  doctors,
  availabilitySlots,
}: BookingCatalogProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [submittedAt] = useState(() => Date.now());
  const form = useForm<BookingRequestInput>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      serviceType: "home_visit",
      category: "specialty",
      itemId: "",
      doctorId: "",
      slotId: "",
      fullName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
      preferredCommunication: "phone",
      paymentMethod: "online",
      consent: true,
      honeypot: "",
      submittedAt,
    },
  });

  const serviceType = useWatch({
    control: form.control,
    name: "serviceType",
  });
  const category = useWatch({
    control: form.control,
    name: "category",
  });
  const itemId = useWatch({
    control: form.control,
    name: "itemId",
  });
  const slotId = useWatch({
    control: form.control,
    name: "slotId",
  });
  const paymentMethod = useWatch({
    control: form.control,
    name: "paymentMethod",
  });

  const canSelectSpecialty =
    serviceType === "home_visit"
      ? services.some((item) => item.serviceMode === "home_visit")
      : services.some((item) => item.serviceMode === "online_consultation");
  const canSelectDiagnostic =
    serviceType === "home_visit" && diagnostics.some((item) => item.homeAvailable);
  const canSelectLaboratory =
    serviceType === "home_visit" &&
    laboratoryServices.some((item) => item.homeAvailable);

  const categoryOptions = [
    {
      value: "specialty" as const,
      label: "ექიმის სპეციალობა",
      enabled: canSelectSpecialty,
    },
    {
      value: "diagnostic" as const,
      label: "დიაგნოსტიკა",
      enabled: canSelectDiagnostic,
    },
    {
      value: "laboratory" as const,
      label: "ლაბორატორია",
      enabled: canSelectLaboratory,
    },
  ];

  const availableItems: BookingItem[] =
    category === "specialty"
      ? services.filter((item) => item.serviceMode === serviceType)
      : category === "diagnostic"
        ? diagnostics.filter((item) => serviceType === "home_visit" && item.homeAvailable)
        : laboratoryServices.filter(
            (item) => serviceType === "home_visit" && item.homeAvailable,
          );

  const selectedItem =
    availableItems.find((item) => item.id === itemId) ??
    null;

  const availableSlots = availabilitySlots
    .filter(
      (slot) =>
        slot.category === category &&
        slot.serviceType === serviceType &&
        slot.itemId === itemId &&
        slot.status === "available",
    )
    .sort(
      (left, right) =>
        new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime(),
    );

  const selectedSlot =
    availableSlots.find((slot) => slot.id === slotId) ?? null;

  const selectedDoctor = selectedSlot?.doctorId
    ? doctors.find((doctor) => doctor.id === selectedSlot.doctorId) ?? null
    : null;

  useEffect(() => {
    const nextCategory = canSelectSpecialty
      ? "specialty"
      : canSelectDiagnostic
        ? "diagnostic"
        : "laboratory";

    const currentEnabled =
      (category === "specialty" && canSelectSpecialty) ||
      (category === "diagnostic" && canSelectDiagnostic) ||
      (category === "laboratory" && canSelectLaboratory);

    if (!currentEnabled) {
      form.setValue("category", nextCategory);
      form.setValue("itemId", "");
      form.setValue("slotId", "");
    }
  }, [
    canSelectDiagnostic,
    canSelectLaboratory,
    canSelectSpecialty,
    category,
    form,
  ]);

  useEffect(() => {
    if (itemId && !availableItems.some((item) => item.id === itemId)) {
      form.setValue("itemId", "");
      form.setValue("slotId", "");
    }
  }, [availableItems, form, itemId]);

  useEffect(() => {
    if (slotId && !availableSlots.some((slot) => slot.id === slotId)) {
      form.setValue("slotId", "");
    }
  }, [availableSlots, form, slotId]);

  async function handleNext() {
    setServerError(null);

    const patientFields: Array<keyof BookingRequestInput> = [
      "fullName",
      "phone",
      "email",
      "preferredCommunication",
      "consent",
    ];

    if (serviceType === "home_visit") {
      patientFields.push("address");
    }

    const fieldsByStep: Array<Array<keyof BookingRequestInput>> = [
      ["serviceType"],
      ["category"],
      ["itemId"],
      ["slotId"],
      patientFields,
      ["paymentMethod"],
    ];

    const isValid = await form.trigger(fieldsByStep[currentStep], {
      shouldFocus: true,
    });

    if (isValid) {
      setCurrentStep((step) => Math.min(5, step + 1));
    }
  }

  async function submitBooking(values: BookingRequestInput) {
    setServerError(null);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as {
      message?: string;
      nextUrl?: string;
    };

    if (!response.ok || !payload.nextUrl) {
      const message =
        payload.message ?? "ჯავშნის შენახვა ვერ მოხერხდა. სცადეთ ხელახლა.";
      setServerError(message);
      toast.error(message);
      return;
    }

    toast.success("ჯავშანი წარმატებით დაფიქსირდა");
    router.push(payload.nextUrl);
  }

  const onSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      void submitBooking(values);
    });
  });

  return (
    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] 2xl:grid-cols-[minmax(0,1fr)_24rem] 2xl:gap-8">
      <div className="min-w-0 space-y-6">
        <Stepper steps={bookingSteps} currentStep={currentStep} />

        <Card className="min-w-0 p-5 sm:p-7 lg:p-8">
          <form className="min-w-0 space-y-7 sm:space-y-8" onSubmit={onSubmit}>
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("honeypot")} />

            {currentStep === 0 ? (
              <div className="space-y-6">
                <div className="max-w-3xl space-y-3">
                  <h2 className="break-words font-serif text-3xl leading-tight text-secondary sm:text-[2rem]">
                    აირჩიეთ მომსახურების ფორმატი
                  </h2>
                  <p className="break-words text-base leading-7 text-muted">
                    გადაწყვიტეთ გსურთ ექიმი თქვენს მისამართზე თუ ონლაინ ვიდეოკონსულტაცია.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {[
                    {
                      value: "home_visit" as const,
                      title: "სახლში ვიზიტი",
                      description: "მისამართზე მოსული ექიმი, ექთანი ან კვლევა.",
                    },
                    {
                      value: "online_consultation" as const,
                      title: "ონლაინ კონსულტაცია",
                      description: "ვიდეოკონსულტაცია სპეციალისტთან სახლიდან.",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => form.setValue("serviceType", option.value)}
                      className={`flex h-full min-w-0 flex-col rounded-[1.75rem] border px-5 py-5 text-left transition duration-200 sm:px-6 sm:py-6 ${
                        serviceType === option.value
                          ? "border-primary bg-primary/8 shadow-[0_18px_36px_rgba(12,140,143,0.08)]"
                          : "border-border bg-white hover:border-primary/35 hover:bg-white/95"
                      }`}
                    >
                      <p className="break-words text-xl font-semibold leading-8 text-secondary">{option.title}</p>
                      <p className="mt-3 break-words text-sm leading-6 text-muted">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentStep === 1 ? (
              <div className="space-y-6">
                <div className="max-w-3xl space-y-3">
                  <h2 className="break-words font-serif text-3xl leading-tight text-secondary sm:text-[2rem]">
                    აირჩიეთ კატეგორია
                  </h2>
                  <p className="break-words text-base leading-7 text-muted">
                    სისტემა გაჩვენებთ მხოლოდ იმ კატეგორიებს, რომლებიც არჩეულ ფორმატში ხელმისაწვდომია.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      disabled={!option.enabled}
                      onClick={() => {
                        form.setValue("category", option.value);
                        form.setValue("itemId", "");
                        form.setValue("slotId", "");
                      }}
                      className={`flex h-full min-w-0 items-start rounded-[1.75rem] border px-5 py-5 text-left transition duration-200 sm:px-6 ${
                        category === option.value
                          ? "border-primary bg-primary/8 shadow-[0_18px_36px_rgba(12,140,143,0.08)]"
                          : "border-border bg-white hover:border-primary/35 hover:bg-white/95"
                      } ${!option.enabled ? "cursor-not-allowed opacity-45 hover:border-border hover:bg-white" : ""}`}
                    >
                      <p className="break-words text-base font-semibold leading-7 text-secondary">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentStep === 2 ? (
              <div className="space-y-6">
                <div className="max-w-3xl space-y-3">
                  <h2 className="break-words font-serif text-3xl leading-tight text-secondary sm:text-[2rem]">
                    აირჩიეთ კონკრეტული სერვისი
                  </h2>
                  <p className="break-words text-base leading-7 text-muted">
                    {category === "specialty"
                      ? "სპეციალისტის სერვისები ფილტრავს ფორმატისა და ხელმისაწვდომობის მიხედვით."
                      : "აირჩიეთ დიაგნოსტიკური ან ლაბორატორიული სერვისი."}
                  </p>
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                  {availableItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        form.setValue("itemId", item.id);
                        form.setValue("slotId", "");
                      }}
                      className={`flex h-full min-w-0 flex-col rounded-[1.75rem] border px-5 py-5 text-left transition duration-200 sm:px-6 ${
                        itemId === item.id
                          ? "border-primary bg-primary/8 shadow-[0_18px_36px_rgba(12,140,143,0.08)]"
                          : "border-border bg-white hover:border-primary/35 hover:bg-white/95"
                      }`}
                    >
                      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <p className="break-words text-lg font-semibold leading-7 text-secondary">{item.name}</p>
                        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          {formatMoney(item.price)}
                        </span>
                      </div>
                      <p className="mt-3 break-words text-sm leading-6 text-muted">{item.summary}</p>
                    </button>
                  ))}
                </div>
                <FieldError message={form.formState.errors.itemId?.message} />
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div className="space-y-6">
                <div className="max-w-3xl space-y-3">
                  <h2 className="break-words font-serif text-3xl leading-tight text-secondary sm:text-[2rem]">
                    აირჩიეთ თარიღი და დრო
                  </h2>
                  <p className="break-words text-base leading-7 text-muted">
                    ერთი სლოტი ნიშნავს ერთი დადასტურების ფანჯარას. დაკავების თავიდან ასაცილებლად დრო ხელახლა მოწმდება სერვერზე.
                  </p>
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                  {availableSlots.length ? (
                    availableSlots.map((slot) => {
                      const doctor = slot.doctorId
                        ? doctors.find((item) => item.id === slot.doctorId)
                        : null;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => {
                            form.setValue("slotId", slot.id);
                            form.setValue("doctorId", doctor?.id ?? "");
                          }}
                          className={`flex h-full min-w-0 flex-col rounded-[1.75rem] border px-5 py-5 text-left transition duration-200 sm:px-6 ${
                            slotId === slot.id
                              ? "border-primary bg-primary/8 shadow-[0_18px_36px_rgba(12,140,143,0.08)]"
                              : "border-border bg-white hover:border-primary/35 hover:bg-white/95"
                          }`}
                        >
                          <p className="break-words text-lg font-semibold leading-7 text-secondary">
                            {formatDateTime(slot.startsAt)}
                          </p>
                          <p className="mt-2 break-words text-sm leading-6 text-muted">
                            {doctor ? doctor.fullName : "მორიგე გუნდი"}
                          </p>
                        </button>
                      );
                    })
                  ) : (
                    <Alert
                      title="სლოტები არ მოიძებნა"
                      description="აირჩიეთ სხვა სერვისი ან სცადეთ მოგვიანებით. ხელმისაწვდომობა დინამიკურად განახლდება."
                    />
                  )}
                </div>
                <FieldError message={form.formState.errors.slotId?.message} />
              </div>
            ) : null}

            {currentStep === 4 ? (
              <div className="space-y-6">
                <div className="max-w-3xl space-y-3">
                  <h2 className="break-words font-serif text-3xl leading-tight text-secondary sm:text-[2rem]">
                    პაციენტის ინფორმაცია
                  </h2>
                  <p className="break-words text-base leading-7 text-muted">
                    სერვერული ვალიდაცია გადაამოწმებს ყველა ველს და მხოლოდ საჭირო მონაცემები შეინახება.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="min-w-0 space-y-2 md:col-span-2">
                    <Input placeholder="სახელი და გვარი" {...form.register("fullName")} />
                    <FieldError message={form.formState.errors.fullName?.message} />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <Input placeholder="ტელეფონი" {...form.register("phone")} />
                    <FieldError message={form.formState.errors.phone?.message} />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <Input placeholder="ელფოსტა" type="email" {...form.register("email")} />
                    <FieldError message={form.formState.errors.email?.message} />
                  </div>
                  {serviceType === "home_visit" ? (
                    <div className="min-w-0 space-y-2 md:col-span-2">
                      <Input placeholder="მისამართი" {...form.register("address")} />
                      <FieldError message={form.formState.errors.address?.message} />
                    </div>
                  ) : (
                    <div className="min-w-0 md:col-span-2">
                      <Alert
                        title="ვიდეოკონსულტაცია"
                        description="ონლაინ ვიზიტის ბმული და ინსტრუქციები გამოგეგზავნებათ ელფოსტაზე ან არჩეულ საკომუნიკაციო არხზე."
                      />
                    </div>
                  )}
                  <div className="min-w-0 space-y-2 md:col-span-2">
                    <Textarea
                      placeholder="სიმპტომები ან დამატებითი შენიშვნები"
                      {...form.register("notes")}
                    />
                    <FieldError message={form.formState.errors.notes?.message} />
                  </div>
                  <div className="min-w-0 space-y-2 md:col-span-2">
                    <Select {...form.register("preferredCommunication")}>
                      <option value="phone">ტელეფონი</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">ელფოსტა</option>
                    </Select>
                  </div>
                </div>
                <label className="flex min-w-0 items-start gap-3 rounded-[1.75rem] border border-border bg-white p-4 text-sm leading-6 text-muted sm:p-5">
                  <input type="checkbox" className="mt-1 h-4 w-4" {...form.register("consent")} />
                  ვადასტურებ, რომ მოწოდებული ინფორმაცია სწორია და Velora Care-ს შეუძლია გამოიყენოს იგი ჯავშნის დამუშავებისთვის.
                </label>
                <FieldError message={form.formState.errors.consent?.message} />
              </div>
            ) : null}

            {currentStep === 5 ? (
              <div className="space-y-6">
                <div className="max-w-3xl space-y-3">
                  <h2 className="break-words font-serif text-3xl leading-tight text-secondary sm:text-[2rem]">
                    აირჩიეთ გადახდის მეთოდი
                  </h2>
                  <p className="break-words text-base leading-7 text-muted">
                    ონლაინ რეჟიმი მზად არის provider abstraction-ით, ადგილზე გადახდა კი როგორც `onsite_pending` სტატუსი ინახება.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {[
                    {
                      value: "online" as const,
                      title: "ონლაინ გადახდა",
                      description: "Mock provider flow-ის გავლით ან მომავალში რეალური gateway-ით.",
                    },
                    {
                      value: "onsite" as const,
                      title: "ადგილზე გადახდა",
                      description: "გადახდა ვიზიტის ან მომსახურების ადგილზე.",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => form.setValue("paymentMethod", option.value)}
                      className={`flex h-full min-w-0 flex-col rounded-[1.75rem] border px-5 py-5 text-left transition duration-200 sm:px-6 sm:py-6 ${
                        paymentMethod === option.value
                          ? "border-primary bg-primary/8 shadow-[0_18px_36px_rgba(12,140,143,0.08)]"
                          : "border-border bg-white hover:border-primary/35 hover:bg-white/95"
                      }`}
                    >
                      <p className="break-words text-lg font-semibold leading-7 text-secondary">{option.title}</p>
                      <p className="mt-3 break-words text-sm leading-6 text-muted">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
                {serverError ? (
                  <Alert title="დაფიქსირდა პრობლემა" description={serverError} tone="danger" />
                ) : null}
                <Alert
                  title="სერვერული შემოწმება"
                  description="გაგზავნისას სისტემა კიდევ ერთხელ გადაამოწმებს სლოტს, სერვისს, მისამართს და გადახდის მდგომარეობას."
                />
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
                disabled={currentStep === 0 || isPending}
              >
                უკან
              </Button>

              {currentStep < 5 ? (
                <Button type="button" className="w-full sm:w-auto" onClick={handleNext}>
                  შემდეგი
                </Button>
              ) : (
                <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
                  {isPending ? "იგზავნება..." : "ჯავშნის დადასტურება"}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      <div className="min-w-0 self-start">
        <div className="space-y-6 xl:sticky xl:top-24">
          <BookingSummary
            serviceType={serviceType}
            category={category}
            item={selectedItem}
            slot={selectedSlot}
            doctorName={selectedDoctor?.fullName}
            paymentMethod={paymentMethod}
          />

          <Card className="min-w-0 p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            სასარგებლო ინფორმაცია
          </p>
          <div className="mt-4 space-y-4 break-words text-sm leading-7 text-muted">
            <p>მხოლოდ სახლში ვიზიტისთვის გამოჩნდება მისამართის ველი.</p>
            <p>ონლაინ კონსულტაცია ამ ეტაპზე ხელმისაწვდომია სპეციალისტების სერვისებისთვის.</p>
            <p>სლოტის საბოლოო დაკავება ხდება მხოლოდ სერვერული შემოწმებისა და ჩანაწერის შექმნის შემდეგ.</p>
            {selectedItem ? (
              <div className="rounded-[1.5rem] bg-surface-muted p-4 sm:p-5">
                <p className="break-words font-medium text-secondary">{selectedItem.name}</p>
                <p className="mt-2 break-words">{selectedItem.description}</p>
                {"price" in selectedItem ? (
                  <p className="mt-3 font-medium text-secondary">
                    {formatMoney(selectedItem.price)}
                  </p>
                ) : null}
              </div>
            ) : null}
            {category === "specialty" ? (
              <div className="rounded-[1.5rem] border border-border bg-white p-4 sm:p-5">
                <p className="font-medium text-secondary">ხელმისაწვდომი სპეციალობები</p>
                <p className="mt-2 break-words">{specialties.map((item) => item.name).join(", ")}</p>
              </div>
            ) : null}
          </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
