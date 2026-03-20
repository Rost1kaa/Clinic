import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Pagination({
  currentPage,
  totalPages,
  makeHref,
}: {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted">
        გვერდი {currentPage} / {totalPages}
      </p>
      <div className="flex items-center gap-3">
        <Button asChild variant="secondary" size="sm" disabled={currentPage <= 1}>
          <Link href={makeHref(Math.max(1, currentPage - 1))}>წინა</Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages}
        >
          <Link href={makeHref(Math.min(totalPages, currentPage + 1))}>შემდეგი</Link>
        </Button>
      </div>
    </div>
  );
}
