import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const redirectScript = `
  (() => {
    let seconds = 5;
    const countdown = document.getElementById("redirect-countdown");
    const interval = window.setInterval(() => {
      seconds -= 1;
      if (countdown) countdown.textContent = String(Math.max(seconds, 0));
      if (seconds <= 0) window.clearInterval(interval);
    }, 1000);

    window.setTimeout(() => window.location.replace("/"), 5000);
  })();
`;

export default function NotFound() {
  return (
    <div className="site-shell inner-page not-found-page">
      <SiteHeader />
      <main className="not-found-main wrap">
        <p className="eyebrow red">404 / Signal lost</p>
        <h1>Page not found.</h1>
        <p className="not-found-copy">
          The page you were looking for does not exist or has moved.
        </p>
        <p className="not-found-countdown" aria-live="polite">
          Returning home in <strong id="redirect-countdown">5</strong> seconds.
        </p>
        <Link className="button button-solid" href="/">
          Go home now
        </Link>
      </main>
      <SiteFooter />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
    </div>
  );
}
