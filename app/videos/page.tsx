import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { VideoGallery } from "./VideoGallery";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch Dystekt live. Videos from our gigs.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <div className="site-shell inner-page videos-page">
      <SiteHeader />
      <main>
        <Breadcrumbs items={[{ name: "Dystekt", href: "/" }, { name: "Videos", href: "/videos" }]} showNavigation={false} />
        <header className="page-header wrap">
          <p className="eyebrow red">Live / Dystekt</p>
          <h1>Videos</h1>
          <p className="page-lede">From the stage. Watch our live gigs.</p>
        </header>
        <VideoGallery />
      </main>
      <SiteFooter />
    </div>
  );
}
