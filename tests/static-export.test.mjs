import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);

async function html(route = "") {
  return readFile(new URL(`${route ? `${route}/` : ""}index.html`, output), "utf8");
}

function jsonLd(htmlContent) {
  return [...htmlContent.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

test("exports every public page as static HTML", async () => {
  const [home, gigsHtml, musicHtml, downloadsHtml, contactHtml, imprint, gigsConfig, musicConfig, downloadsConfig] = await Promise.all([
    html(),
    html("gigs"),
    html("music"),
    html("downloads"),
    html("contact"),
    html("imprint"),
    readFile(new URL("../data/gigs.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../data/music.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../data/downloads.json", import.meta.url), "utf8").then(JSON.parse),
  ]);

  assert.match(home, /five-piece melodic death metal band founded in July/);
  assert.match(home, /Stay up to date\./);
  assert.match(home, /social-icon/);
  assert.match(home, /rel="canonical" href="https:\/\/dystekt\.band\/"/);
  assert.match(home, /dystekt-social-preview\.jpg/);
  const bandData = jsonLd(home).find((entry) => entry["@type"] === "MusicGroup" && entry.name === "Dystekt");
  assert.equal(bandData.email, "mailto:contact@dystekt.band");
  assert.deepEqual(bandData.contactPoint, {
    "@type": "ContactPoint",
    email: "contact@dystekt.band",
    contactType: "booking and press enquiries",
    areaServed: "Worldwide",
    availableLanguage: ["English", "German"],
  });
  assert.ok(jsonLd(home).some((entry) => entry["@type"] === "WebSite" && entry.name === "Dystekt"));
  for (const platform of ["Instagram", "Bandcamp", "Linktree", "YouTube", "X / Twitter"]) {
    assert.ok(home.includes(platform));
  }
  for (const [page, label] of [
    [gigsHtml, "Gigs"],
    [musicHtml, "Music"],
    [downloadsHtml, "Downloads"],
    [contactHtml, "Contact"],
    [imprint, "Imprint"],
  ]) {
    const breadcrumb = jsonLd(page).find((entry) => entry["@type"] === "BreadcrumbList");
    assert.deepEqual(
      breadcrumb.itemListElement.map((item) => item.name),
      ["Dystekt", label],
    );
    assert.ok(!page.includes('aria-label="Breadcrumb"'));
  }
  for (const gig of gigsConfig.events) {
    const iso = gig.startDate.slice(0, 10);
    const venue = gigsConfig.venues.find((entry) => entry.id === gig.venueId);
    assert.ok(venue);
    assert.ok(gigsHtml.includes(gig.title));
    assert.ok(gigsHtml.includes(gig.flyer));
    assert.ok(gigsHtml.includes(gig.image));
    assert.ok(gigsHtml.includes(`/gigs/${iso}`));

    const eventHtml = await html(`gigs/${iso}`);
    const eventData = jsonLd(eventHtml).find((entry) => entry["@type"] === "Event");
    const breadcrumbData = jsonLd(eventHtml).find((entry) => entry["@type"] === "BreadcrumbList");
    assert.deepEqual(
      breadcrumbData.itemListElement.map((item) => item.name),
      ["Dystekt", "Gigs", gig.title],
    );
    assert.ok(eventHtml.includes('aria-label="Breadcrumb"'));
    assert.equal(eventData.name, gig.title);
    assert.equal(eventData.startDate, gig.startDate);
    assert.equal(eventData.endDate, gig.endDate);
    assert.equal(eventData.offers.price, gig.presalePrice ?? gig.doorPrice);
    assert.equal(eventData.offers.priceCurrency, "EUR");
    assert.ok(!("validFrom" in eventData.offers));
    assert.equal(eventData.offers.url, gig.ticket ?? `https://dystekt.band/gigs/${iso}/`);
    assert.equal(eventData.sameAs, gig.website ?? undefined);
    if (gig.website) assert.ok(gigsHtml.includes(gig.website));
    assert.equal(eventData.organizer.name, gig.organizer);
    assert.equal(eventData.location.name, venue.name);
    assert.equal(eventData.location.address.addressCountry, venue.country);
    assert.deepEqual(eventData.performer.map((band) => band.name), gig.bands.map((band) => band.name));
    assert.equal(
      eventData.performer.find((band) => band.name.toLowerCase() === "dystekt").email,
      "mailto:contact@dystekt.band",
    );
    for (const band of gig.bands) {
      assert.ok(gigsHtml.includes(band.name));
      assert.ok(gigsHtml.includes(band.instagram));
    }
    assert.ok(eventHtml.includes(`<meta name="twitter:title" content="${gig.title} — Dystekt"`));
    assert.ok(eventHtml.includes(`<meta name="twitter:image" content="https://dystekt.band${gig.image}"`));
    assert.ok(eventHtml.includes(`class="flyer-lightbox"`));
    assert.ok(eventHtml.includes(`${gig.image.replace(".webp", "-320.webp")} 320w`));
    assert.ok(eventHtml.includes(`${gig.image.replace(".webp", "-1000.webp")} 1000w`));
    assert.ok(eventHtml.includes("View flyer"));
    if (gig.info) {
      assert.ok(eventHtml.includes("About the show"));
      for (const section of gig.info) {
        assert.ok(eventHtml.includes(section.heading));
      }
    }
  }
  for (const track of musicConfig.tracks) {
    assert.ok(musicHtml.includes(track.name));
    assert.ok(musicHtml.includes(track.file));
  }
  for (const download of downloadsConfig.items) {
    assert.ok(downloadsHtml.includes(download.name));
    assert.ok(downloadsHtml.includes(download.file));
  }
  assert.match(contactHtml, /Contact Dystekt for concert bookings/);
  assert.match(contactHtml, /mailto:contact@dystekt\.band\?subject=Booking%20enquiry/);
  assert.match(contactHtml, /mailto:contact@dystekt\.band\?subject=Press%20enquiry/);
  assert.match(contactHtml, /Dystekt_Presskit\.zip/);
  assert.match(contactHtml, /Dystekt_Tech_Rider\.pdf/);
  assert.match(contactHtml, /rel="canonical" href="https:\/\/dystekt\.band\/contact\//);
  assert.match(contactHtml, /property="og:title" content="Contact &amp; Booking - Dystekt"/);
  assert.match(contactHtml, /property="og:url" content="https:\/\/dystekt\.band\/contact\//);
  assert.match(contactHtml, /name="twitter:title" content="Contact &amp; Booking - Dystekt"/);
  assert.match(contactHtml, /melodic death metal band from Cologne, Germany/);
  assert.match(imprint, /Christopher Krohn/);
  assert.match(imprint, /contact@dystekt\.band/);
  assert.match(imprint, /Herler Str\. 61/);
  assert.match(imprint, /<meta name="robots" content="noindex, follow"/);
});

test("copies deployable media and GitHub Pages files", async () => {
  await Promise.all([
    access(new URL("media/dystekt-band.jpg", output)),
    access(new URL("media/dystekt-band.webp", output)),
    access(new URL("media/dystekt-band-640.webp", output)),
    access(new URL("media/dystekt-band-2560.webp", output)),
    access(new URL("media/dystekt-band-3840.webp", output)),
    access(new URL("media/dystekt-social-preview.jpg", output)),
    access(new URL("media/dystekt-logo.svg", output)),
    access(new URL("media/dystekt-sneak-peek.flac", output)),
    access(new URL("media/Dystekt_Presskit.zip", output)),
    access(new URL("media/Dystekt_Tech_Rider.pdf", output)),
    access(new URL("media/cologne-cataclysm-2026.jpg", output)),
    access(new URL("media/cologne-cataclysm-2026.webp", output)),
    access(new URL("media/cologne-cataclysm-2026-320.webp", output)),
    access(new URL("media/cologne-cataclysm-2026-1000.webp", output)),
    access(new URL("media/gift-und-galle-2026.jpg", output)),
    access(new URL("media/gift-und-galle-2026.webp", output)),
    access(new URL("sitemap.xml", output)),
    access(new URL("robots.txt", output)),
    access(new URL("CNAME", output)),
    access(new URL(".nojekyll", output)),
  ]);

  assert.equal((await readFile(new URL("CNAME", output), "utf8")).trim(), "dystekt.band");
  assert.equal(
    (await readFile(new URL("../CNAME", import.meta.url), "utf8")).trim(),
    "dystekt.band",
  );
  assert.equal(
    (await readFile(new URL("../public/CNAME", import.meta.url), "utf8")).trim(),
    "dystekt.band",
  );

  const sitemap = await readFile(new URL("sitemap.xml", output), "utf8");
  assert.match(sitemap, /https:\/\/dystekt\.band\/gigs\/2026-09-12\//);
  assert.match(sitemap, /https:\/\/dystekt\.band\/contact\//);
  assert.doesNotMatch(sitemap, /\/imprint\//);

  const robots = await readFile(new URL("robots.txt", output), "utf8");
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/dystekt\.band\/sitemap\.xml/);
});

test("uses only the dependencies needed for this static site", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
    "next",
    "react",
    "react-dom",
  ]);
});
