"use client";

import { useEffect, useState } from "react";
import gigs from "../../data/gigs.json";
import { isPastGig, sortGigsByDate } from "../lib/gigs";
import { GigCard } from "./GigCard";

export function GigLists() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    const interval = window.setInterval(updateNow, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const upcomingGigs = sortGigsByDate(gigs.events.filter((gig) => !isPastGig(gig, now)));
  const pastGigs = sortGigsByDate(gigs.events.filter((gig) => isPastGig(gig, now)), "descending");

  return (
    <>
      {upcomingGigs.length > 0 ? (
        <section className="gig-section wrap" aria-labelledby="upcoming-gigs-title">
          <h2 id="upcoming-gigs-title" className="gig-section-title">Upcoming shows</h2>
          <div className="gig-list">
            {upcomingGigs.map((gig, index) => <GigCard gig={gig} index={index} key={gig.startDate} />)}
          </div>
        </section>
      ) : null}

      {pastGigs.length > 0 ? (
        <section className="gig-section wrap" aria-labelledby="past-gigs-title">
          <h2 id="past-gigs-title" className="gig-section-title">Past shows</h2>
          <div className="gig-list">
            {pastGigs.map((gig, index) => <GigCard gig={gig} index={index} key={gig.startDate} />)}
          </div>
        </section>
      ) : null}
    </>
  );
}
