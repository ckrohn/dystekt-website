import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const instagramUrl = "https://www.instagram.com/dystektofficial/";
const posts = [
  "https://www.instagram.com/p/DdOYBLVjSrL/embed/captioned/",
  "https://www.instagram.com/reel/DdBn0O5k4ua/embed/captioned/",
  "https://www.instagram.com/p/DcyzjMbiH1f/embed/captioned/",
  "https://www.instagram.com/reel/Dcv7Z_uG2n-/embed/captioned/",
  "https://www.instagram.com/p/DbqXjGvNzEb/embed/captioned/",
];

export const metadata: Metadata = {
  title: "Instagram",
  description: "The latest posts from Dystekt on Instagram.",
  alternates: { canonical: "/instagram" },
};

export default function InstagramPage() {
  return (
    <div className="site-shell inner-page instagram-page">
      <SiteHeader />
      <main>
        <Breadcrumbs items={[{ name: "Dystekt", href: "/" }, { name: "Instagram", href: "/instagram" }]} showNavigation={false} />
        <header className="page-header wrap">
          <p className="eyebrow red">Social / Dystekt</p>
          <h1>Instagram</h1>
          <p className="page-lede">Posts, reels and moments from the band.</p>
        </header>
        <section className="instagram-feed wrap" aria-labelledby="instagram-feed-title">
          <h2 id="instagram-feed-title" className="visually-hidden">Latest Instagram posts</h2>
          <div className="instagram-post-grid">
            {posts.map((post, index) => (
              <article className="instagram-post" key={post}>
                <iframe
                  className="instagram-embed"
                  src={post}
                  title={`Dystekt Instagram post ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  allow="encrypted-media"
                />
              </article>
            ))}
          </div>
          <p>
            <a className="text-link dark-link" href={instagramUrl} target="_blank" rel="noreferrer">
              View all posts on Instagram <span aria-hidden="true">↗</span>
            </a>
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
