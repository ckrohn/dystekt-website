import type { Metadata } from "next";
import "./globals.css";

const description =
  "Dystekt is melodic death metal from Cologne, Germany. Listen to the latest sneak peek and find upcoming live dates.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dystekt.band"),
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
  },
  twitter: {
    card: "summary",
    title: "Dystekt — Melodic Death Metal from Cologne",
    description,
  },
};

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
