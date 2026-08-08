import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Music",
  description: "Listen to the latest Dystekt sneak peek.",
};

export default function MusicPage() {
  return (
    <div className="site-shell music-page">
      <SiteHeader />
      <main>
        <section className="music-hero">
          <div className="music-photo" aria-hidden="true" />
          <div className="wrap music-layout">
            <div className="music-title-block">
              <p className="eyebrow">First signal / new material</p>
              <h1>Sneak<br />Peek</h1>
              <p>Unreleased · 2026</p>
            </div>

            <div className="player-card">
              <div className="player-topline">
                <span>01</span>
                <span>Audio / FLAC</span>
              </div>
              <img src="/media/dystekt-logo.svg" alt="Dystekt" />
              <div className="track-title">
                <span>Dystekt</span>
                <strong>Sneak Peek</strong>
              </div>
              <audio controls preload="metadata">
                <source src="/media/dystekt-sneak-peek.flac" type="audio/flac" />
                Your browser does not support FLAC audio.
              </audio>
              <a className="download-link" href="/media/dystekt-sneak-peek.flac" download>
                Download lossless audio <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        <section className="music-note wrap">
          <span className="section-mark"><span>NOTE</span></span>
          <p>
            This is a work-in-progress glimpse at what we are building. More
            music is coming. Follow Dystekt to hear it first.
          </p>
          <a className="text-link dark-link" href="https://linktr.ee/dystekt" target="_blank" rel="noreferrer">
            Follow Dystekt <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
