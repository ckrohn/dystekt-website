"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "./SocialLinks";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  return (
    <header className="site-header">
      <Link className="header-brand" href="/" aria-label="Dystekt home">
        <img src="/media/dystekt-logo.svg" alt="" />
      </Link>
      <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        {menuOpen ? "Close" : "Menu"}
      </button>
      <nav id="primary-navigation" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
        <Link onClick={() => setMenuOpen(false)} href="/">Band</Link>
        <Link onClick={() => setMenuOpen(false)} href="/gigs">Gigs</Link>
        <Link onClick={() => setMenuOpen(false)} href="/music">Music</Link>
        <Link onClick={() => setMenuOpen(false)} href="/instagram">Posts</Link>
        <Link onClick={() => setMenuOpen(false)} href="/videos">Videos</Link>
        <Link onClick={() => setMenuOpen(false)} href="/downloads">Downloads</Link>
        <Link onClick={() => setMenuOpen(false)} href="/contact">Contact</Link>
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
