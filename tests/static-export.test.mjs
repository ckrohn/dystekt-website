import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);

async function html(route = "") {
  return readFile(new URL(`${route ? `${route}/` : ""}index.html`, output), "utf8");
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
  for (const platform of ["Instagram", "Bandcamp", "Linktree", "YouTube", "X / Twitter"]) {
    assert.ok(home.includes(platform));
  }
  for (const gig of gigsConfig.events) {
    assert.ok(gigsHtml.includes(gig.title));
    assert.ok(gigsHtml.includes(gig.flyer));
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
});

test("copies deployable media and GitHub Pages files", async () => {
  await Promise.all([
    access(new URL("media/dystekt-band.jpg", output)),
    access(new URL("media/dystekt-logo.svg", output)),
    access(new URL("media/dystekt-sneak-peek.flac", output)),
    access(new URL("media/Dystekt_Presskit.zip", output)),
    access(new URL("media/Dystekt_Tech_Rider.pdf", output)),
    access(new URL("media/cologne-cataclysm-2026.jpg", output)),
    access(new URL("media/gift-und-galle-2026.jpg", output)),
    access(new URL("CNAME", output)),
    access(new URL(".nojekyll", output)),
  ]);

  assert.equal((await readFile(new URL("CNAME", output), "utf8")).trim(), "www.dystekt.band");
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
