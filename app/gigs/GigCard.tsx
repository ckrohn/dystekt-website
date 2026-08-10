"use client";

import Link from "next/link";
import { useRef } from "react";
import { formatGigPrice, formatVenueAddress, getGigDateParts, getGigIso, getResponsiveImageSrcSet, getVenue, type Gig } from "../lib/gigs";

export function GigCard({
  gig,
  index,
  showDetailLink = true,
}: {
  gig: Gig;
  index: number;
  showDetailLink?: boolean;
}) {
  const lightbox = useRef<HTMLDialogElement>(null);
  const date = getGigDateParts(gig);
  const venue = getVenue(gig);

  function openFlyer() {
    if (window.matchMedia("(max-width: 760px)").matches) return;
    lightbox.current?.showModal();
  }

  function closeFlyer() {
    lightbox.current?.close();
  }

  return (
    <article className="gig-card">
      <div className="gig-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <button
        type="button"
        className="flyer-frame"
        aria-label={`Enlarge flyer for ${gig.title}`}
        onClick={openFlyer}
      >
        <img
          src={gig.image}
          srcSet={getResponsiveImageSrcSet(gig.image)}
          sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 35vw, 430px"
          width={gig.imageWidth}
          height={gig.imageHeight}
          loading={index === 0 ? "eager" : "lazy"}
          alt={`${gig.title} event flyer`}
        />
      </button>
      <div className="gig-info">
        <time dateTime={getGigIso(gig)} className="gig-date">
          <strong>{date.day}</strong>
          <span>{date.month} / {date.year}</span>
        </time>
        <div>
          <h2>
            {showDetailLink ? (
              <Link href={`/gigs/${getGigIso(gig)}`}>{gig.title}</Link>
            ) : gig.title}
          </h2>
          <p className="gig-venue">{venue.name}</p>
        </div>
        <dl className="gig-details">
          <div><dt>Address</dt><dd>{formatVenueAddress(venue)}</dd></div>
          <div>
            <dt>Line-up</dt>
            <dd className="gig-bands">
              {gig.bands.map((band) => (
                <a key={band.name} href={band.instagram} target="_blank" rel="noreferrer">
                  {band.name}<span className="visually-hidden"> on Instagram</span>
                </a>
              ))}
            </dd>
          </div>
          <div><dt>Doors / Start</dt><dd>{gig.doors} / {gig.start}</dd></div>
          <div><dt>Entry</dt><dd>{formatGigPrice(gig)}</dd></div>
        </dl>
        <div className="gig-actions">
          {gig.ticket ? (
            <a className="button button-solid" href={gig.ticket} target="_blank" rel="noreferrer">
              Presale tickets
            </a>
          ) : (
            <span className="door-note">Door tickets · no presale listed</span>
          )}
          {gig.website ? (
            <a className="text-link dark-link" href={gig.website} target="_blank" rel="noreferrer">
              Event website <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {showDetailLink && gig.info ? (
            <Link className="text-link dark-link" href={`/gigs/${getGigIso(gig)}`}>
              Event details <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          <button type="button" className="text-link dark-link flyer-trigger-link" onClick={openFlyer}>
            View flyer <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <dialog
        ref={lightbox}
        className="flyer-lightbox"
        aria-label={`${gig.title} flyer`}
      >
        <button
          type="button"
          className="flyer-lightbox-backdrop"
          aria-label="Close flyer"
          onClick={closeFlyer}
        />
        <div className="flyer-lightbox-content">
          <button type="button" className="flyer-lightbox-close" aria-label="Close flyer" onClick={closeFlyer}>
            <span aria-hidden="true">×</span>
          </button>
          <img
            src={gig.image}
            srcSet={getResponsiveImageSrcSet(gig.image)}
            sizes="86vw"
            width={gig.imageWidth}
            height={gig.imageHeight}
            loading="lazy"
            decoding="async"
            alt={`${gig.title} event flyer, enlarged`}
          />
        </div>
      </dialog>
    </article>
  );
}
