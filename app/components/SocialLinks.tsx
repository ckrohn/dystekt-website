const links = [
  ["Instagram", "https://www.instagram.com/dystektofficial"],
  ["Bandcamp", "https://dystekt.bandcamp.com"],
  ["Linktree", "https://linktr.ee/dystekt"],
  ["YouTube", "https://www.youtube.com/@Dystekt"],
  ["X / Twitter", "https://x.com/dystekt"],
] as const;

export function SocialLinks() {
  return (
    <div className="social-list">
      {links.map(([label, href], index) => (
        <a key={label} href={href} target="_blank" rel="noreferrer">
          <span className="social-number">0{index + 1}</span>
          <span>{label}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
