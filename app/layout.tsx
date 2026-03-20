import type { Metadata } from "next";
import { Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { buildMetadata } from "@/lib/utils/metadata";
import "./globals.css";

const sans = Noto_Sans_Georgian({
  variable: "--font-georgian-sans",
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700"],
});

const serif = Noto_Serif_Georgian({
  variable: "--font-georgian-serif",
  subsets: ["georgian"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
