import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export function Alert({
  title,
  description,
  tone = "primary",
  className,
}: {
  title: string;
  description: string;
  tone?: "primary" | "warning" | "danger";
  className?: string;
}) {
  const styles = {
    primary: "border-primary/20 bg-primary/5",
    warning: "border-warning/20 bg-warning/8",
    danger: "border-danger/20 bg-danger/8",
  };

  return (
    <div className={cn("min-w-0 overflow-hidden rounded-3xl border p-5", styles[tone], className)}>
      <Badge variant={tone === "danger" ? "accent" : "neutral"}>{title}</Badge>
      <p className="mt-3 break-words text-sm leading-6 text-muted-strong">{description}</p>
    </div>
  );
}
