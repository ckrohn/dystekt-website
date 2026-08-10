import type { Metadata } from "next";
import Link from "next/link";
import gigs from "../data/gigs.json";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SocialLinks } from "./components/SocialLinks";
import { getGigDateParts, getVenue } from "./lib/gigs";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const nextGig = gigs.events[0];
  const nextGigDate = nextGig ? getGigDateParts(nextGig) : null;
  const nextGigVenue = nextGig ? getVenue(nextGig) : null;

  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />

          <div className="hero-content wrap">
            <h1 id="hero-title" className="visually-hidden">
              Dystekt
            </h1>
            <img
              className="hero-logo"
              src="/media/dystekt-logo.svg"
              alt="Dystekt"
            />
            <div className="hero-actions">
              <Link className="button button-solid" href="/music">
                Hear the sneak peek
              </Link>
              <Link className="text-link" href="/gigs">
                Upcoming shows <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <p className="hero-index" aria-hidden="true">
            01 / DYSTEKT
          </p>
        </section>

        <section className="intro section wrap" aria-labelledby="intro-title">
          <div className="section-mark">
            <span>02</span>
            <span>ABOUT</span>
          </div>
          <div className="intro-copy">
            <h2 id="intro-title" className="visually-hidden">About Dystekt</h2>
            <div className="intro-body">
              <p>
                Dystekt is a five-piece melodic death metal band founded in July
                2025. Musically, the band combines hard-hitting riffs, melodic
                guitars and driving rhythms with brutal vocals.
              </p>
              <p>
                The songs deliberately move between different styles of modern
                metal. Alongside intense, full-force passages, there are
                influences from metalcore and thrash metal as well as more
                atmospheric, melody-driven sections. The result is a varied
                sound that refuses to be tied to a single direction, while
                keeping its focus firmly rooted in melodic death metal.
              </p>
              <p>Dystekt is currently working on its first EP.</p>
            </div>
          </div>
        </section>

        {nextGig ? (
          <section className="next-show" aria-labelledby="next-show-title">
            <div className="wrap next-show-grid">
              <div>
                <p className="eyebrow red">Next live impact</p>
                <h2 id="next-show-title">{nextGig.title}</h2>
                <p className="show-location">{nextGigVenue?.name} · {nextGigVenue?.city}</p>
              </div>
              <div className="show-date" aria-label={nextGigDate?.label}>
                <span>{nextGigDate?.day}</span>
                <span>{nextGigDate?.month} / {nextGigDate?.shortYear}</span>
              </div>
              <Link className="button button-outline" href="/gigs">
                Full gig details
              </Link>
            </div>
          </section>
        ) : null}

        <section className="section connect wrap" aria-labelledby="connect-title">
          <div className="section-mark">
            <span>03</span>
            <span>FOLLOW</span>
          </div>
          <div>
            <h2 id="connect-title">Stay up to date.</h2>
            <SocialLinks />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
