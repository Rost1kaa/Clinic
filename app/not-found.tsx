import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-screen items-center justify-center py-24">
      <div className="surface-card max-w-2xl space-y-6 p-10 text-center">
        <p className="text-sm font-semibold text-primary">
          404
        </p>
        <h1 className="font-serif text-4xl text-secondary">
          მოთხოვნილი გვერდი ვერ მოიძებნა
        </h1>
        <p className="text-lg text-muted">
          ბმული შესაძლოა შეცვლილია ან გვერდი დროებით მიუწვდომელია. დაბრუნდით
          მთავარ გვერდზე და განაგრძეთ ნავიგაცია.
        </p>
        <Button asChild>
          <Link href="/">მთავარ გვერდზე დაბრუნება</Link>
        </Button>
      </div>
    </div>
  );
}
