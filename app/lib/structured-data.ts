import gigs from "../../data/gigs.json";

const siteUrl = "https://dystekt.band";
export const bandId = `${siteUrl}/#band`;

export type Gig = (typeof gigs.events)[number];

export const bandStructuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": bandId,
  name: "Dystekt",
  url: siteUrl,
  description:
    "Dystekt is a five-piece melodic death metal band from Cologne, Germany.",
  genre: ["Melodic death metal", "Metalcore", "Thrash metal"],
  foundingDate: "2025-07",
  foundingLocation: {
    "@type": "City",
    name: "Cologne",
    alternateName: "Köln",
    addressCountry: "DE",
  },
  image: `${siteUrl}/media/dystekt-band.webp`,
  logo: `${siteUrl}/media/dystekt-logo.svg`,
  sameAs: [
    "https://www.instagram.com/dystektofficial",
    "https://dystekt.bandcamp.com",
    "https://www.youtube.com/@Dystekt",
    "https://x.com/dystekt",
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Dystekt",
  alternateName: "Dystekt Band",
  inLanguage: "en",
  publisher: {
    "@id": bandId,
  },
};

export function getEventStructuredData(gig: Gig) {
  const eventUrl = `${siteUrl}/gigs/${gig.iso}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${eventUrl}#event`,
    name: gig.title,
    description: `${gig.title} at ${gig.venue} in ${gig.city}, featuring Dystekt. Doors at ${gig.doors}; show starts at ${gig.start}.`,
    startDate: gig.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: eventUrl,
    image: [`${siteUrl}${gig.image}`],
    location: {
      "@type": "Place",
      name: gig.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: gig.streetAddress,
        postalCode: gig.postalCode,
        addressLocality: gig.addressLocality,
        addressCountry: gig.addressCountry,
      },
    },
    performer: {
      "@type": "MusicGroup",
      "@id": bandId,
      name: "Dystekt",
      url: siteUrl,
    },
  };
}
