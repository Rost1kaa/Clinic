import Link from "next/link";
import { Check, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type ServiceOptionCardProps = {
  price: string;
  title: string;
  meta?: string;
  description: string;
  services: string[];
  detailHref: string;
  bookingHref?: string;
  icon?: LucideIcon;
  id?: string;
  className?: string;
  plainServices?: boolean;
  emphasizePrice?: boolean;
  largeIcon?: boolean;
  centeredServiceRows?: boolean;
  emphasizeMetaName?: boolean;
};

export function ServiceOptionCard({
  price,
  title,
  meta,
  description,
  services,
  detailHref,
  bookingHref = "/booking",
  icon: Icon,
  id,
  className,
  plainServices = false,
  emphasizePrice = false,
  largeIcon = false,
  centeredServiceRows = false,
  emphasizeMetaName = false,
}: ServiceOptionCardProps) {
  const metaParts = meta ? meta.split(" • ") : [];
  const metaName = metaParts[0];
  const metaDetail = metaParts.slice(1).join(" • ");

  return (
    <Card
      id={id}
      className={cn(
        "flex h-full flex-col rounded-[1.8rem] border border-white/90 bg-white p-6 shadow-[0_16px_40px_rgba(18,52,54,0.06)] sm:p-7",
        className,
      )}
    >
      <CardHeader className="space-y-5">
        <div
          className={cn(
            "flex gap-4",
            Icon ? "items-center justify-between" : "items-start justify-start",
          )}
        >
          <Badge
            className={cn(
              "border border-primary/15 bg-primary-soft text-primary-strong",
              emphasizePrice && "px-3.5 py-1.5 text-[1.25rem] font-bold leading-none sm:text-[1.4rem]",
            )}
          >
            {price}
          </Badge>

          {Icon ? (
            <div
              className={cn(
                "flex items-center justify-center rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(233,248,235,0.96),rgba(255,255,255,1))] text-primary-strong",
                largeIcon ? "h-16 w-16" : "h-12 w-12",
              )}
            >
              <Icon className={cn(largeIcon ? "h-9 w-9" : "h-5 w-5")} />
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <CardTitle className="text-[1.55rem]">{title}</CardTitle>
            {meta ? (
              <p className="text-sm font-medium leading-6 text-secondary">
                {emphasizeMetaName && metaName ? (
                  <>
                    <span className="font-semibold text-secondary underline decoration-current underline-offset-[3px] transition-opacity duration-200 hover:opacity-80">
                      {metaName}
                    </span>
                    {metaDetail ? (
                      <>
                        <span className="px-1 text-secondary/65">•</span>
                        {metaDetail}
                      </>
                    ) : null}
                  </>
                ) : (
                  meta
                )}
              </p>
            ) : null}
          </div>
          <CardDescription className="min-h-[4.5rem] text-sm leading-6 text-muted">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-strong">
            მომსახურებები
          </p>
          <div className={cn("space-y-3", plainServices && "space-y-2.5")}>
            {services.map((service) => (
              <div
                key={service}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,249,248,0.9))] px-4 py-3",
                  centeredServiceRows && "items-center gap-2.5",
                  plainServices && "rounded-none border-0 bg-transparent px-0 py-0",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary-strong",
                    centeredServiceRows ? "mt-0" : "mt-0.5",
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-6 text-muted">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <CardFooter
          className={cn(
            "flex-wrap border-t border-border/70 pt-6 sm:flex-nowrap",
            plainServices && "border-t-0 pt-4",
          )}
        >
          <Button asChild variant="secondary" className="flex-1 rounded-[1rem]">
            <Link href={detailHref}>დეტალურად</Link>
          </Button>
          <Button asChild className="flex-1 rounded-[1rem]">
            <Link href={bookingHref}>დაჯავშნა</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
