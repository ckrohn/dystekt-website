import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import gigs from "../../../data/gigs.json";
import { JsonLd } from "../../components/JsonLd";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getGigDateParts, getGigIso, getVenue } from "../../lib/gigs";
import { getEventBreadcrumbStructuredData, getEventStructuredData } from "../../lib/structured-data";
import { GigCard } from "../GigCard";

type EventPageProps = {
  params: Promise<{ iso: string }>;
};

export function generateStaticParams() {
  return gigs.events.map((gig) => ({ iso: getGigIso(gig) }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { iso } = await params;
  const gig = gigs.events.find((event) => getGigIso(event) === iso);

  if (!gig) {
    return {};
  }

  const date = getGigDateParts(gig);
  const venue = getVenue(gig);
  const description = `${date.label}: Dystekt live at ${venue.name} in ${venue.city}.`;
  const socialImage = {
    url: gig.image,
    width: gig.imageWidth,
    height: gig.imageHeight,
    alt: `${gig.title} event flyer`,
  };

  return {
    title: gig.title,
    description,
    alternates: {
      canonical: `/gigs/${getGigIso(gig)}/`,
    },
    openGraph: {
      title: `${gig.title} — Dystekt`,
      description,
      url: `/gigs/${getGigIso(gig)}/`,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${gig.title} — Dystekt`,
      description,
      images: [gig.image],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { iso } = await params;
  const gig = gigs.events.find((event) => getGigIso(event) === iso);

  if (!gig) {
    notFound();
  }

  const date = getGigDateParts(gig);
  const venue = getVenue(gig);

  return (
    <div className="site-shell inner-page">
      <SiteHeader />
      <main>
        <JsonLd data={getEventStructuredData(gig)} />
        <JsonLd data={getEventBreadcrumbStructuredData(gig)} />
        <nav className="breadcrumb wrap" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Dystekt</Link></li>
            <li><Link href="/gigs">Gigs</Link></li>
            <li aria-current="page">{gig.title}</li>
          </ol>
        </nav>
        <header className="page-header event-header wrap">
          <p className="eyebrow red">Live / {date.label}</p>
          <h1>{gig.title}</h1>
          <p className="page-lede">Dystekt live at {venue.name} in {venue.city}.</p>
        </header>

        <section className="gig-list event-gig-list wrap" aria-label={`${gig.title} details`}>
          <GigCard gig={gig} index={0} showDetailLink={false} />
        </section>

        {gig.info ? (
          <section className="event-info wrap" aria-labelledby="event-info-title">
            <p className="eyebrow red">Event info</p>
            <div className="event-info-grid">
              <h2 id="event-info-title">About the show</h2>
              <div className="event-info-sections">
                {gig.info.map((section) => (
                  <section key={section.heading}>
                    <h3>{section.heading}</h3>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
