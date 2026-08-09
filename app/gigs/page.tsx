import type { Metadata } from "next";
import gigs from "../../data/gigs.json";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { GigCard } from "./GigCard";

export const metadata: Metadata = {
  title: "Gigs",
  description: "Upcoming Dystekt live dates and show details.",
  alternates: {
    canonical: "/gigs/",
  },
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
            <GigCard gig={gig} index={index} key={gig.iso} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
