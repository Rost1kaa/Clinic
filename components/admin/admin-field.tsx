import { cn } from "@/lib/utils/cn";

export function AdminField({
  label,
  description,
  error,
  htmlFor,
  className,
  children,
}: {
  label: string;
  description?: string;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0 space-y-2.5", className)}>
      <div className="space-y-1">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium leading-6 text-secondary"
        >
          {label}
        </label>
        {description ? (
          <p className="break-words text-sm leading-6 text-muted">{description}</p>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="break-words text-sm leading-6 text-danger">{error}</p>
      ) : null}
    </div>
  );
}
