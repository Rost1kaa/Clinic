import { BrandLoader } from "@/components/ui/brand-loader";

export default function SiteLoading() {
  return (
    <BrandLoader
      fullScreen={false}
      className="min-h-[calc(100svh-9rem)]"
    />
  );
}
