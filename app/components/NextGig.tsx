"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gigs from "../../data/gigs.json";
import { getGigDateParts, getVenue, isPastGig, sortGigsByDate } from "../lib/gigs";

export function NextGig() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    const interval = window.setInterval(updateNow, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const nextGig = sortGigsByDate(gigs.events.filter((gig) => !isPastGig(gig, now)))[0];
  if (!nextGig) return null;

  const date = getGigDateParts(nextGig);
  const venue = getVenue(nextGig);

  return (
    <section className="next-show" aria-labelledby="next-show-title">
      <div className="wrap next-show-grid">
        <div>
          <p className="eyebrow red">Next live impact</p>
          <h2 id="next-show-title">{nextGig.title}</h2>
          <p className="show-location">{venue.name} · {venue.city}</p>
        </div>
        <div className="show-date" aria-label={date.label}>
          <span>{date.day}</span>
          <span>{date.month} / {date.shortYear}</span>
        </div>
        <Link className="button button-outline" href="/gigs">
          Full gig details
        </Link>
      </div>
    </section>
  );
}
