import type { Metadata } from "next";
import music from "../../data/music.json";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Music",
  description: "Listen to the latest Dystekt sneak peek.",
  alternates: {
    canonical: "/music",
  },
};

export default function MusicPage() {
  return (
    <div className="site-shell music-page">
      <SiteHeader />
      <main>
        <Breadcrumbs items={[{ name: "Dystekt", href: "/" }, { name: "Music", href: "/music" }]} showNavigation={false} />
        <section className="music-hero">
          <div className="music-photo" aria-hidden="true" />
          <div className="wrap music-layout">
            <div className="music-title-block">
              <p className="eyebrow">{music.eyebrow}</p>
              <h1>{music.title[0]}<br />{music.title[1]}</h1>
              <p>{music.release}</p>
            </div>

            {music.tracks.map((track, index) => (
              <div className="player-card" key={track.file}>
                <div className="player-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{track.format}</span>
                </div>
                <img src="/media/dystekt-logo.svg" alt="Dystekt" />
                <div className="track-title">
                  <span>{track.artist}</span>
                  <strong>{track.name}</strong>
                </div>
                <audio controls preload="metadata">
                  <source src={track.file} type={track.mimeType} />
                  Your browser does not support this audio format.
                </audio>
                <a className="download-link" href={track.file} download>
                  {track.downloadLabel} <span aria-hidden="true">↓</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="music-note wrap">
          <span className="section-mark"><span>NOTE</span></span>
          <p>{music.note}</p>
          <a className="text-link dark-link" href={music.followUrl} target="_blank" rel="noreferrer">
            {music.followLabel} <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
