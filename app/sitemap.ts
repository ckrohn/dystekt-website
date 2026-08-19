import type { MetadataRoute } from "next";
import gigs from "../data/gigs.json";
import { getGigIso } from "./lib/gigs";

const siteUrl = "https://dystekt.band";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/gigs", "/music", "/downloads", "/contact"];

  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...gigs.events.map((gig) => ({
      url: `${siteUrl}/gigs/${getGigIso(gig)}`,
    })),
  ];
}
