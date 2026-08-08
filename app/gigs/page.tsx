import type { Metadata } from "next";
import gigs from "../../data/gigs.json";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Gigs",
  description: "Upcoming Dystekt live dates and show details.",
};

export default function GigsPage() {
  return (
    <div className="site-shell inner-page">
      <SiteHeader />
      <main>
        <header className="page-header wrap">
          <p className="eyebrow red">{gigs.eyebrow}</p>
          <h1>{gigs.title}</h1>
          <p className="page-lede">{gigs.intro}</p>
        </header>

        <section className="gig-list wrap" aria-label="Upcoming gigs">
          {gigs.events.map((gig, index) => (
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
