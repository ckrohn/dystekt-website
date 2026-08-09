import Link from "next/link";
import type { Gig } from "../lib/structured-data";

export function GigCard({
  gig,
  index,
  showDetailLink = true,
}: {
  gig: Gig;
  index: number;
  showDetailLink?: boolean;
}) {
  return (
    <article className="gig-card">
      <div className="gig-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <a
        className="flyer-frame"
        href={gig.flyer}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full flyer for ${gig.title}`}
      >
        <img
          src={gig.image}
          width={gig.imageWidth}
          height={gig.imageHeight}
          alt={`${gig.title} event flyer`}
        />
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
          {showDetailLink ? (
            <Link className="text-link dark-link" href={`/gigs/${gig.iso}`}>
              Event details <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          <a className="text-link dark-link" href={gig.flyer} target="_blank" rel="noreferrer">
            View flyer <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
