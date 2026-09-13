import type { Metadata } from "next";
import gigs from "../../data/gigs.json";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { GigLists } from "./GigLists";

export const metadata: Metadata = {
  title: "Gigs",
  description: "Upcoming Dystekt live dates and show details.",
  alternates: {
    canonical: "/gigs",
  },
};

export default function GigsPage() {
  return (
    <div className="site-shell inner-page">
      <SiteHeader />
      <main>
        <Breadcrumbs items={[{ name: "Dystekt", href: "/" }, { name: "Gigs", href: "/gigs" }]} showNavigation={false} />
        <header className="page-header wrap">
          <p className="eyebrow red">{gigs.eyebrow}</p>
          <h1>{gigs.title}</h1>
          <p className="page-lede">{gigs.intro}</p>
        </header>

        <GigLists />
      </main>
      <SiteFooter />
    </div>
  );
}
