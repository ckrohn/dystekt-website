import type { Metadata } from "next";
import { notFound } from "next/navigation";
import gigs from "../../../data/gigs.json";
import { JsonLd } from "../../components/JsonLd";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getEventStructuredData } from "../../lib/structured-data";
import { GigCard } from "../GigCard";

type EventPageProps = {
  params: Promise<{ iso: string }>;
};

export function generateStaticParams() {
  return gigs.events.map((gig) => ({ iso: gig.iso }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { iso } = await params;
  const gig = gigs.events.find((event) => event.iso === iso);

  if (!gig) {
    return {};
  }

  const description = `${gig.dateLabel}: Dystekt live at ${gig.venue} in ${gig.city}.`;
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
      canonical: `/gigs/${gig.iso}/`,
    },
    openGraph: {
      title: `${gig.title} — Dystekt`,
      description,
      url: `/gigs/${gig.iso}/`,
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
  const gig = gigs.events.find((event) => event.iso === iso);

  if (!gig) {
    notFound();
  }

  return (
    <div className="site-shell inner-page">
      <SiteHeader />
      <main>
        <JsonLd data={getEventStructuredData(gig)} />
        <header className="page-header event-header wrap">
          <p className="eyebrow red">Live / {gig.dateLabel}</p>
          <h1>{gig.title}</h1>
          <p className="page-lede">Dystekt live at {gig.venue} in {gig.city}.</p>
        </header>

        <section className="gig-list wrap" aria-label={`${gig.title} details`}>
          <GigCard gig={gig} index={0} showDetailLink={false} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
