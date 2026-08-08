import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "www.dystekt.band";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const description =
    "Dystekt is melodic death metal from Cologne, Germany. Listen to the latest sneak peek and find upcoming live dates.";

  return {
    metadataBase: baseUrl,
    title: {
      default: "Dystekt — Melodic Death Metal from Cologne",
      template: "%s — Dystekt",
    },
    description,
    icons: {
      icon: "/media/dystekt-logo.svg",
      shortcut: "/media/dystekt-logo.svg",
    },
    openGraph: {
      type: "website",
      title: "Dystekt — Melodic Death Metal from Cologne",
      description,
      siteName: "Dystekt",
      images: [{ url: new URL("/og.png", baseUrl).toString(), width: 1731, height: 909, alt: "Dystekt band" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dystekt — Melodic Death Metal from Cologne",
      description,
      images: [new URL("/og.png", baseUrl).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
