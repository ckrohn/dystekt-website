import type { Metadata } from "next";
import Link from "next/link";
import { NextGig } from "./components/NextGig";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SocialLinks } from "./components/SocialLinks";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
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

        <section className="members section wrap" aria-labelledby="members-title">
          <div className="section-mark"><span>03</span><span>LINE-UP</span></div>
          <div className="members-content">
            <h2 id="members-title" className="visually-hidden">Line-Up</h2>
            <ul className="members-list">
              <li><span>Thomas</span><span>Vocals</span><a href="https://www.instagram.com/ulebambule" target="_blank" rel="noreferrer">@ulebambule <span aria-hidden="true">↗</span></a></li>
              <li><span>Chris</span><span>Guitar</span><a href="https://www.instagram.com/christekt" target="_blank" rel="noreferrer">@christekt <span aria-hidden="true">↗</span></a></li>
              <li><span>Felix</span><span>Guitar</span></li>
              <li><span>Dominik</span><span>Drums</span><a href="https://www.instagram.com/druminik_dystekt" target="_blank" rel="noreferrer">@druminik_dystekt <span aria-hidden="true">↗</span></a></li>
              <li><span>TBA</span><span>Bass</span></li>
            </ul>
          </div>
        </section>

        <NextGig />

        <section className="section connect wrap" aria-labelledby="connect-title">
          <div className="section-mark">
            <span>04</span>
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
