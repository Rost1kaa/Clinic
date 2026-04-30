import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/app-providers";
import { buildMetadata } from "@/lib/utils/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
