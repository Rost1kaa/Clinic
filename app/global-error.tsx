"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ka">
      <body className="min-h-screen bg-background">
        <div className="container-shell flex min-h-screen items-center justify-center py-24">
          <div className="surface-card max-w-2xl space-y-6 p-10 text-center">
            <p className="text-sm font-semibold text-danger">
              ტექნიკური შეფერხება
            </p>
            <h1 className="font-serif text-4xl text-secondary">
              გვერდის ჩატვირთვა ამ ეტაპზე ვერ მოხერხდა
            </h1>
            <p className="text-lg text-muted">
              დავაფიქსირეთ შეცდომა და შეგვიძლია ახლავე ხელახლა ვცადოთ. თუ
              პრობლემა დარჩება, გამოიყენეთ საკონტაქტო არხები.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={reset}>ხელახლა ცდა</Button>
              <Button
                variant="secondary"
                onClick={() => (window.location.href = "/contact")}
              >
                კონტაქტი
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
