import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Contact Dystekt for concert bookings, press enquiries and production information.",
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: "Contact & Booking - Dystekt",
    description:
      "Book Dystekt for concerts, festivals and support shows, or contact the band for press enquiries.",
    url: "/contact/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Booking - Dystekt",
    description:
      "Book Dystekt for concerts, festivals and support shows, or contact the band for press enquiries.",
  },
};

const email = "contact@dystekt.band";

export default function ContactPage() {
  return (
    <div className="site-shell inner-page contact-page">
      <SiteHeader />
      <main>
        <Breadcrumbs items={[{ name: "Dystekt", href: "/" }, { name: "Contact", href: "/contact/" }]} />
        <header className="page-header contact-header wrap">
          <p className="eyebrow red">Booking / Press</p>
          <h1>Contact</h1>
          <p className="page-lede">
            Book Dystekt, a melodic death metal band from Cologne, Germany,
            for concerts, festivals and support shows.
          </p>
        </header>

        <section className="contact-list wrap" aria-label="Contact information">
          <article className="contact-card">
            <p className="contact-label">Live / Booking</p>
            <h2>Book Dystekt</h2>
            <p>
              For concert, festival and support-slot enquiries, send us the
              date, location, venue and any available production details.
            </p>
            <a className="button button-solid" href={`mailto:${email}?subject=Booking%20enquiry`}>
              Booking enquiry <span aria-hidden="true">&rarr;</span>
            </a>
          </article>

          <article className="contact-card">
            <p className="contact-label">Media / Press</p>
            <h2>Press enquiries</h2>
            <p>
              Contact us for interviews, reviews, promotional material or
              other media requests.
            </p>
            <a className="button button-solid" href={`mailto:${email}?subject=Press%20enquiry`}>
              Press enquiry <span aria-hidden="true">&rarr;</span>
            </a>
          </article>
        </section>

        <section className="contact-resources wrap" aria-labelledby="contact-resources-title">
          <div>
            <p className="contact-label">Based in</p>
            <h2 id="contact-resources-title">Cologne, Germany</h2>
            <a className="contact-email" href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="contact-downloads">
            <a className="text-link dark-link" href="/media/Dystekt_Presskit.zip" download>
              Download press kit <span aria-hidden="true">&darr;</span>
            </a>
            <a className="text-link dark-link" href="/media/Dystekt_Tech_Rider.pdf" download>
              Download tech rider <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
