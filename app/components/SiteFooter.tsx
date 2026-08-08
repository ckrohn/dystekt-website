import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <Link className="footer-brand" href="/" aria-label="Dystekt home">
          <img src="/media/dystekt-logo.svg" alt="" />
        </Link>
        <p className="footer-tagline">Melodic death metal · Cologne, Germany</p>
        <div className="footer-meta">
          <Link href="/imprint">Imprint</Link>
          <span>© {new Date().getFullYear()} Dystekt</span>
        </div>
      </div>
    </footer>
  );
}
