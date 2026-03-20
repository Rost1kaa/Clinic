import { Badge } from "@/components/ui/badge";

export function AdminPageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(10,55,58,0.08)] backdrop-blur-xl sm:p-7">
      <Badge variant="neutral">{eyebrow}</Badge>
      <h2 className="mt-4 font-serif text-3xl leading-tight text-secondary sm:text-[2.2rem]">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl break-words text-base leading-7 text-muted">
        {description}
      </p>
    </div>
  );
}
