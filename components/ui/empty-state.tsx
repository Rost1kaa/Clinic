import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="surface-card flex flex-col items-center gap-5 p-10 text-center">
      <div className="rounded-full bg-surface-muted p-4 text-primary">+</div>
      <div className="space-y-3">
        <h3 className="font-serif text-2xl text-secondary">{title}</h3>
        <p className="max-w-xl text-muted">{description}</p>
      </div>
      {action ? (
        <Button asChild variant="secondary">
          <a href={action.href}>{action.label}</a>
        </Button>
      ) : null}
    </div>
  );
}
