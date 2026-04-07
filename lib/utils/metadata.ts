import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/site";
import { env } from "@/lib/utils/env";

type MetadataInput = {
  title?: string;
  absoluteTitle?: string;
  description?: string;
  path?: string;
  image?: string;
};

const defaultTitle = siteConfig.legalName;
const defaultDescription =
  "მედსერვისი აერთიანებს სხვადასხვა სპეციალობის ექიმთა გუნდებს, სახლში ვიზიტებს, ონლაინ კონსულტაციებს, დიაგნოსტიკასა და ლაბორატორიულ მომსახურებას.";

export function absoluteUrl(path = "/") {
  return `${env.siteUrl}${path === "/" ? "" : path}`;
}

export function buildMetadata({
  title,
  absoluteTitle,
  description = defaultDescription,
  path = "/",
  image = "/opengraph-image",
}: MetadataInput = {}): Metadata {
  const resolvedTitle =
    absoluteTitle ?? (title ? `${title} | ${siteConfig.name}` : defaultTitle);
  const url = absoluteUrl(path);
  const resolvedImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    metadataBase: new URL(env.siteUrl),
    applicationName: siteConfig.name,
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: ["/icon.svg"],
      apple: [{ url: "/icon.svg" }],
    },
    title: resolvedTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.legalName,
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
