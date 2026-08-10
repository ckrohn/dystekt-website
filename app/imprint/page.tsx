import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Imprint & Privacy",
  description: "Legal notice, contact information and privacy information for Dystekt.",
  alternates: {
    canonical: "/imprint/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ImprintPage() {
  return (
    <div className="site-shell inner-page legal-page">
      <SiteHeader />
      <main>
        <Breadcrumbs items={[{ name: "Dystekt", href: "/" }, { name: "Imprint", href: "/imprint/" }]} />
        <header className="legal-header wrap">
          <p className="eyebrow red">Legal / Contact</p>
          <h1>Imprint</h1>
        </header>

        <div className="legal-content wrap">
          <section className="legal-section" aria-labelledby="provider-heading">
            <h2 id="provider-heading">Information pursuant to § 5 DDG</h2>
            <address>
              Christopher Krohn<br />
              Herler Str. 61<br />
              51067 Cologne<br />
              Germany
            </address>
          </section>

          <section className="legal-section" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact</h2>
            <p>Email: <a href="mailto:contact@dystekt.band">contact@dystekt.band</a></p>
          </section>

          <section className="legal-section" aria-labelledby="content-heading">
            <h2 id="content-heading">Responsible for content</h2>
            <p>
              Christopher Krohn<br />
              Herler Str. 61<br />
              51067 Cologne<br />
              Germany
            </p>
          </section>

          <section className="legal-section" aria-labelledby="dispute-heading">
            <h2 id="dispute-heading">Consumer dispute resolution</h2>
            <p>
              We are neither willing nor obliged to participate in dispute
              resolution proceedings before a consumer arbitration board.
            </p>
          </section>

          <section className="legal-section privacy-section" aria-labelledby="privacy-heading">
            <p className="eyebrow red">Data protection</p>
            <h2 id="privacy-heading">Privacy information</h2>

            <h3>Controller</h3>
            <p>
              Christopher Krohn, Herler Str. 61, 51067 Cologne, Germany<br />
              <a href="mailto:contact@dystekt.band">contact@dystekt.band</a>
            </p>

            <h3>Hosting and server logs</h3>
            <p>
              This static website is hosted using GitHub Pages, a service of
              GitHub, Inc. When a GitHub Pages site is visited, GitHub logs the
              visitor&apos;s IP address for security purposes. GitHub may also
              process technical usage information such as the request time,
              device and browser information. This processing is necessary to
              deliver and secure the website. The legal basis is our legitimate
              interest in secure and reliable website operation under Article
              6(1)(f) GDPR.
            </p>
            <p>
              Further information is available in the{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Privacy Statement <span aria-hidden="true">↗</span>
              </a>.
            </p>

            <h3>Contact by email</h3>
            <p>
              If you contact us by email, we process the information you provide
              in order to respond. The legal basis is Article 6(1)(b) GDPR where
              your request concerns a contract or pre-contractual steps, and
              otherwise Article 6(1)(f) GDPR. Correspondence is deleted when the
              matter is complete unless statutory retention requirements apply.
            </p>

            <h3>Cookies and tracking</h3>
            <p>
              The website itself does not use analytics, advertising trackers or
              non-essential cookies. Hosting infrastructure may use strictly
              necessary technologies to deliver and protect the service.
            </p>

            <h3>Recipients and international processing</h3>
            <p>
              GitHub and its service providers may process data outside the
              European Economic Area. GitHub describes the safeguards used for
              international transfers in its privacy statement.
            </p>

            <h3>Your rights</h3>
            <p>
              Subject to the statutory conditions, you may request access,
              rectification, erasure, restriction of processing and data
              portability, and you may object to processing based on legitimate
              interests. You also have the right to lodge a complaint with a
              data protection supervisory authority. In North Rhine-Westphalia,
              the competent authority is the State Commissioner for Data
              Protection and Freedom of Information NRW.
            </p>
            <p>
              <a href="https://www.ldi.nrw.de/" target="_blank" rel="noreferrer">
                ldi.nrw.de <span aria-hidden="true">↗</span>
              </a>
            </p>

            <p className="legal-updated">Last updated: August 2026</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
