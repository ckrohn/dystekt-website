import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <Link className="footer-brand" href="/" aria-label="Dystekt home">
          <img src="/media/dystekt-logo.svg" alt="" />
        </Link>
        <p>Melodic death metal<br />Cologne, Germany</p>
        <p className="footer-copy">© {new Date().getFullYear()} Dystekt</p>
      </div>
    </footer>
  );
}
