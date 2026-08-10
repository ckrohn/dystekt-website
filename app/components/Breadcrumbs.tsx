import Link from "next/link";
import { JsonLd } from "./JsonLd";

type BreadcrumbItem = {
  name: string;
  href: string;
};

const siteUrl = "https://dystekt.band";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <nav className="breadcrumb wrap" aria-label="Breadcrumb">
        <ol>
          {items.map((item, index) => (
            <li
              aria-current={index === items.length - 1 ? "page" : undefined}
              key={item.href}
            >
              {index === items.length - 1 ? (
                item.name
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
