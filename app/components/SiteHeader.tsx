import Link from "next/link";
import { SocialIcon } from "./SocialLinks";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="header-brand" href="/" aria-label="Dystekt home">
        <img src="/media/dystekt-logo.svg" alt="" />
      </Link>
      <nav className="primary-nav" aria-label="Primary navigation">
        <Link href="/">Band</Link>
        <Link href="/gigs">Gigs</Link>
        <Link href="/music">Music</Link>
        <Link href="/downloads">Downloads</Link>
      </nav>
      <a
        className="header-social"
        href="https://www.instagram.com/dystektofficial"
        target="_blank"
        rel="noreferrer"
      >
        <SocialIcon name="instagram" />
        <span>Instagram</span>
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
