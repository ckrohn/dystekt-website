import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Dystekt landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Dystekt/);
  assert.match(html, /five-piece melodic death metal band founded in July/);
  assert.match(html, /Stay up to date\./);
  assert.doesNotMatch(html, /Dark melody\. Hard edges\./);
  assert.match(html, /Cologne Cataclysm/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("includes the requested content and media", async () => {
  const [gigs, music] = await Promise.all([
    render("/gigs"),
    render("/music"),
  ]);
  assert.equal(gigs.status, 200);
  assert.equal(music.status, 200);
  assert.match(await gigs.text(), /Gift und Galle am Rhein/);
  assert.match(await music.text(), /dystekt-sneak-peek\.flac/);

  await Promise.all([
    access(new URL("../public/media/dystekt-band.jpg", import.meta.url)),
    access(new URL("../public/media/dystekt-logo.svg", import.meta.url)),
    access(new URL("../public/media/dystekt-sneak-peek.flac", import.meta.url)),
    access(new URL("../public/media/cologne-cataclysm-2026.jpg", import.meta.url)),
    access(new URL("../public/media/gift-und-galle-2026.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
