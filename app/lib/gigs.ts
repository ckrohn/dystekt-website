import gigs from "../../data/gigs.json";

export type Gig = (typeof gigs.events)[number];
export type Venue = (typeof gigs.venues)[number];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function getGigIso(gig: Gig) {
  return gig.startDate.slice(0, 10);
}

export function getGigDateParts(gig: Gig) {
  const [year, month, day] = getGigIso(gig).split("-");

  return {
    day,
    month,
    year,
    shortYear: year.slice(-2),
    label: `${Number(day)} ${monthNames[Number(month) - 1]} ${year}`,
  };
}

export function getVenue(gig: Gig): Venue {
  const venue = gigs.venues.find((entry) => entry.id === gig.venueId);

  if (!venue) {
    throw new Error(`Unknown venue ID "${gig.venueId}" for "${gig.title}"`);
  }

  return venue;
}

export function getOfferPrice(gig: Gig) {
  const price = gig.presalePrice ?? gig.doorPrice;

  if (price === null) {
    throw new Error(`No ticket price configured for "${gig.title}"`);
  }

  return price;
}

export function formatGigPrice(gig: Gig) {
  if (gig.presalePrice !== null && gig.doorPrice !== null) {
    return `${gig.presalePrice} € advance · ${gig.doorPrice} € door`;
  }

  if (gig.presalePrice !== null) {
    return `${gig.presalePrice} € advance`;
  }

  return `${getOfferPrice(gig)} € at the door`;
}

export function formatVenueAddress(venue: Venue) {
  return `${venue.street}, ${venue.postalCode} ${venue.city}`;
}
