import { cn } from "@/lib/utils/cn";
import { renderIcon } from "@/lib/utils/icon-map";

export function IconMark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return renderIcon(name, cn("h-6 w-6", className));
}
