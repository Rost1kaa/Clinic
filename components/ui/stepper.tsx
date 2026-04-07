import { cn } from "@/lib/utils/cn";

export function Stepper({
  steps,
  currentStep,
}: {
  steps: readonly string[];
  currentStep: number;
}) {
  return (
    <div className="surface-card min-w-0 p-2 sm:p-3">
      <div className="grid min-w-0 grid-flow-col auto-cols-[minmax(11rem,1fr)] gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {steps.map((step, index) => {
          const active = index === currentStep;
          const complete = index < currentStep;

          return (
            <div
              key={step}
              className={cn(
                "min-w-0 rounded-[1.1rem] border px-4 py-3.5 text-sm transition",
                active && "border-primary bg-primary/8 text-primary",
                complete && "border-success/20 bg-success/8 text-success",
                !active && !complete && "border-border bg-white/90 text-muted",
              )}
            >
              <p className="text-xs font-semibold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 break-words text-sm font-medium leading-6">{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
