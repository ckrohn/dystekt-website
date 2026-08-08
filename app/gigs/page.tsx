import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Gigs",
  description: "Upcoming Dystekt live dates and show details.",
};

const gigs = [
  {
    day: "12",
    month: "09",
    year: "2026",
    iso: "2026-09-12",
    title: "Cologne Cataclysm",
    venue: "Halle am Rhein",
    address: "Am Faulbach 2, 51063 Köln",
    doors: "14:30",
    start: "15:15",
    price: "15 € advance · 20 € door",
    flyer: "/media/cologne-cataclysm-2026.jpg",
    ticket: "https://www.cologne-cataclysm.de",
  },
  {
    day: "23",
    month: "10",
    year: "2026",
    iso: "2026-10-23",
    title: "Gift und Galle am Rhein",
    venue: "Halle am Rhein",
    address: "Am Faulbach 2, 51063 Köln",
    doors: "17:00",
    start: "18:00",
    price: "10 € at the door",
    flyer: "/media/gift-und-galle-2026.jpg",
    ticket: null,
  },
] as const;

export default function GigsPage() {
  return (
    <div className="site-shell inner-page">
      <SiteHeader />
      <main>
        <header className="page-header wrap">
          <p className="eyebrow red">Live / 2026</p>
          <h1>Gigs</h1>
          <p className="page-lede">
            Two nights in Cologne. Amplifiers on, lights down.
          </p>
        </header>

        <section className="gig-list wrap" aria-label="Upcoming gigs">
          {gigs.map((gig, index) => (
            <article className="gig-card" key={gig.iso}>
              <div className="gig-number" aria-hidden="true">
                0{index + 1}
              </div>
              <a
                className="flyer-frame"
                href={gig.flyer}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full flyer for ${gig.title}`}
              >
                <img src={gig.flyer} alt={`${gig.title} event flyer`} />
              </a>
              <div className="gig-info">
                <time dateTime={gig.iso} className="gig-date">
                  <strong>{gig.day}</strong>
                  <span>{gig.month} / {gig.year}</span>
                </time>
                <div>
                  <h2>{gig.title}</h2>
                  <p className="gig-venue">{gig.venue}</p>
                </div>
                <dl className="gig-details">
                  <div><dt>Address</dt><dd>{gig.address}</dd></div>
                  <div><dt>Doors / Start</dt><dd>{gig.doors} / {gig.start}</dd></div>
                  <div><dt>Entry</dt><dd>{gig.price}</dd></div>
                </dl>
                <div className="gig-actions">
                  {gig.ticket ? (
                    <a className="button button-solid" href={gig.ticket} target="_blank" rel="noreferrer">
                      Tickets & info
                    </a>
                  ) : (
                    <span className="door-note">Door tickets · no presale listed</span>
                  )}
                  <a className="text-link dark-link" href={gig.flyer} target="_blank" rel="noreferrer">
                    View flyer <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
