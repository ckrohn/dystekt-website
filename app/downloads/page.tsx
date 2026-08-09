import type { Metadata } from "next";
import downloads from "../../data/downloads.json";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download the Dystekt press kit and technical rider.",
};

export default function DownloadsPage() {
  return (
    <div className="site-shell inner-page downloads-page">
      <SiteHeader />
      <main>
        <header className="page-header downloads-header wrap">
          <p className="eyebrow red">{downloads.eyebrow}</p>
          <h1>{downloads.title}</h1>
          <p className="page-lede">{downloads.intro}</p>
        </header>

        <section className="download-list wrap" aria-label="Available downloads">
          {downloads.items.map((item, index) => (
            <article className="download-card" key={item.file}>
              <span className="download-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="download-info">
                <span className="download-format">{item.format}</span>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <a className="button button-solid" href={item.file} download>
                {item.downloadLabel} <span aria-hidden="true">↓</span>
              </a>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
