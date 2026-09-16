const links = [
  { label: "Instagram", href: "https://www.instagram.com/dystektofficial", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@Dystekt", icon: "youtube" },
  { label: "Bandcamp", href: "https://dystekt.bandcamp.com", icon: "bandcamp" },
  { label: "Linktree", href: "https://linktr.ee/dystekt", icon: "linktree" },
] as const;

type SocialIconName = (typeof links)[number]["icon"];

export function SocialIcon({ name }: { name: SocialIconName }) {
  const commonProps = {
    className: "social-icon",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "instagram":
      return (
        <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.25" />
          <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bandcamp":
      return (
        <svg {...commonProps} fill="currentColor">
          <path d="M7.2 6.5h14L16.8 17.5h-14z" />
        </svg>
      );
    case "linktree":
      return (
        <svg {...commonProps} fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="2">
          <path d="M12 2v6M6.2 4.4l4.1 4.1M17.8 4.4l-4.1 4.1M3 10.5h6M15 10.5h6M6.2 16.2l4.1-4.1M17.8 16.2l-4.1-4.1M12 12v10" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...commonProps} fill="currentColor">
          <path d="M23 12c0-2.2-.2-4.1-.5-5.2a3 3 0 0 0-2.1-2.1C18.8 4.2 16 4 12 4s-6.8.2-8.4.7a3 3 0 0 0-2.1 2.1C1.2 7.9 1 9.8 1 12s.2 4.1.5 5.2a3 3 0 0 0 2.1 2.1c1.6.5 4.4.7 8.4.7s6.8-.2 8.4-.7a3 3 0 0 0 2.1-2.1c.3-1.1.5-3 .5-5.2Zm-13.2 4V8l6.9 4-6.9 4Z" />
        </svg>
      );
  }
}

export function SocialLinks() {
  return (
    <div className="social-list">
      {links.map(({ label, href, icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer">
          <SocialIcon name={icon} />
          <span>{label}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
