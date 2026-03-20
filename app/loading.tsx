export default function Loading() {
  return (
    <div className="container-shell flex min-h-screen items-center justify-center py-24">
      <div className="surface-card w-full max-w-lg space-y-5 p-8 text-center">
        <div className="mx-auto h-3 w-24 animate-pulse rounded-full bg-surface-strong" />
        <div className="mx-auto h-10 w-3/4 animate-pulse rounded-full bg-surface-strong" />
        <div className="mx-auto h-4 w-full animate-pulse rounded-full bg-surface-strong" />
        <div className="mx-auto h-4 w-5/6 animate-pulse rounded-full bg-surface-strong" />
      </div>
    </div>
  );
}
