import { getGigIso, getOfferPrice, getVenue, type Gig } from "./gigs";

const siteUrl = "https://dystekt.band";
export const bandId = `${siteUrl}/#band`;

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
  const venue = getVenue(gig);
  const eventUrl = `${siteUrl}/gigs/${getGigIso(gig)}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${eventUrl}#event`,
    name: gig.title,
    description: `${gig.title} at ${venue.name} in ${venue.city}, featuring Dystekt. Doors at ${gig.doors}; show starts at ${gig.start}.`,
    startDate: gig.startDate,
    endDate: gig.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: eventUrl,
    image: [`${siteUrl}${gig.image}`],
    offers: {
      "@type": "Offer",
      url: gig.ticket ?? eventUrl,
      price: getOfferPrice(gig),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: gig.startDate,
    },
    organizer: {
      "@type": "Organization",
      name: gig.organizer,
    },
    location: {
      "@type": "Place",
      name: venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.street,
        postalCode: venue.postalCode,
        addressLocality: venue.city,
        addressCountry: venue.country,
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
