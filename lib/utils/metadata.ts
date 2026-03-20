import type { Metadata } from "next";
import { env } from "@/lib/utils/env";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

const defaultTitle = "Velora Care | პრემიუმ სამედიცინო სერვისები სახლში და ონლაინ";
const defaultDescription =
  "Velora Care აერთიანებს სხვადასხვა სპეციალობის ექიმთა გუნდებს, სახლთან მოსულ ვიზიტებს, ონლაინ კონსულტაციებს, დიაგნოსტიკასა და ლაბორატორიულ მომსახურებას.";

export function absoluteUrl(path = "/") {
  return `${env.siteUrl}${path === "/" ? "" : path}`;
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = "/opengraph-image",
}: MetadataInput = {}): Metadata {
  const resolvedTitle = title ? `${title} | Velora Care` : defaultTitle;
  const url = absoluteUrl(path);
  const resolvedImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    metadataBase: new URL(env.siteUrl),
    title: resolvedTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: "Velora Care",
      locale: "ka_GE",
      type: "website",
      images: [{ url: resolvedImage, width: 1200, height: 630, alt: resolvedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [resolvedImage],
    },
  };
}
