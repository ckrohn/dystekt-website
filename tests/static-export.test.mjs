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
  const [home, gigsHtml, musicHtml, downloadsHtml, imprint, gigsConfig, musicConfig, downloadsConfig] = await Promise.all([
    html(),
    html("gigs"),
    html("music"),
    html("downloads"),
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
  assert.ok(jsonLd(home).some((entry) => entry["@type"] === "MusicGroup" && entry.name === "Dystekt"));
  assert.ok(jsonLd(home).some((entry) => entry["@type"] === "WebSite" && entry.name === "Dystekt"));
  for (const platform of ["Instagram", "Bandcamp", "Linktree", "YouTube", "X / Twitter"]) {
    assert.ok(home.includes(platform));
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
    assert.equal(eventData.name, gig.title);
    assert.equal(eventData.startDate, gig.startDate);
    assert.equal(eventData.endDate, gig.endDate);
    assert.equal(eventData.offers.price, gig.presalePrice ?? gig.doorPrice);
    assert.equal(eventData.offers.priceCurrency, "EUR");
    assert.equal(eventData.offers.url, gig.ticket ?? `https://dystekt.band/gigs/${iso}/`);
    assert.equal(eventData.organizer.name, gig.organizer);
    assert.equal(eventData.location.name, venue.name);
    assert.equal(eventData.location.address.addressCountry, venue.country);
    assert.equal(eventData.performer.name, "Dystekt");
    assert.ok(eventHtml.includes(`<meta name="twitter:title" content="${gig.title} — Dystekt"`));
    assert.ok(eventHtml.includes(`<meta name="twitter:image" content="https://dystekt.band${gig.image}"`));
  }
  for (const track of musicConfig.tracks) {
    assert.ok(musicHtml.includes(track.name));
    assert.ok(musicHtml.includes(track.file));
  }
  for (const download of downloadsConfig.items) {
    assert.ok(downloadsHtml.includes(download.name));
    assert.ok(downloadsHtml.includes(download.file));
  }
  assert.match(imprint, /Christopher Krohn/);
  assert.match(imprint, /contact@dystekt\.band/);
  assert.match(imprint, /Herler Str\. 61/);
  assert.match(imprint, /<meta name="robots" content="noindex, follow"/);
});

test("copies deployable media and GitHub Pages files", async () => {
  await Promise.all([
    access(new URL("media/dystekt-band.jpg", output)),
    access(new URL("media/dystekt-band.webp", output)),
    access(new URL("media/dystekt-social-preview.jpg", output)),
    access(new URL("media/dystekt-logo.svg", output)),
    access(new URL("media/dystekt-sneak-peek.flac", output)),
    access(new URL("media/Dystekt_Presskit.zip", output)),
    access(new URL("media/Dystekt_Tech_Rider.pdf", output)),
    access(new URL("media/cologne-cataclysm-2026.jpg", output)),
    access(new URL("media/cologne-cataclysm-2026.webp", output)),
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
