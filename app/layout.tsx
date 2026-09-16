import type { Metadata } from "next";
import { JsonLd } from "./components/JsonLd";
import { bandStructuredData, websiteStructuredData } from "./lib/structured-data";
import "./globals.css";

const description =
  "Dystekt is melodic death metal from Cologne, Germany. Listen to the latest sneak peek and find upcoming live dates.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dystekt.band"),
  title: {
    default: "Dystekt — Melodic Death Metal from Cologne",
    template: "%s — Dystekt",
  },
  description,
  icons: {
    icon: { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    shortcut: "/favicon.png",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Dystekt — Melodic Death Metal from Cologne",
    description,
    siteName: "Dystekt",
    images: [
      {
        url: "/media/dystekt-social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Dystekt — melodic death metal from Cologne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dystekt — Melodic Death Metal from Cologne",
    description,
    images: ["/media/dystekt-social-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={websiteStructuredData} />
        <JsonLd data={bandStructuredData} />
        {children}
      </body>
    </html>
  );
}
