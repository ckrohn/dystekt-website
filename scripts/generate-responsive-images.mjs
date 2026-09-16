import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const mediaDirectory = path.resolve("public/media");
const gigs = JSON.parse(await readFile("data/gigs.json", "utf8"));

// Trim the wide SVG's empty margins before centering the complete logo in a
// square. An opaque background keeps its white strokes visible in search UIs.
const faviconLogo = await sharp(path.join(mediaDirectory, "dystekt-logo.svg"))
  .trim()
  .png()
  .toBuffer();
await Promise.all([
  [192, "favicon.png"],
  [180, "apple-touch-icon.png"],
].map(async ([size, filename]) => {
  const inset = Math.round(size * 0.06);
  const logo = await sharp(faviconLogo)
    .resize(size - inset * 2, size - inset * 2, { fit: "inside" })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#0b0b0b" } })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toFile(path.resolve("public", filename));
}));

async function generateWebpVariants(sourceName, outputBase, widths, quality = 80) {
  const source = path.join(mediaDirectory, sourceName);
  const metadata = await sharp(source).metadata();
  const usableWidths = widths.filter((width) => width <= metadata.width);

  await Promise.all(
    usableWidths.map((width) =>
      sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toFile(path.join(mediaDirectory, `${outputBase}-${width}.webp`)),
    ),
  );
}

await generateWebpVariants(
  "dystekt-band.jpg",
  "dystekt-band",
  [640, 960, 1440, 1920, 2560, 2880, 3840],
  82,
);

await Promise.all(
  gigs.events.map((gig) => {
    const sourceName = path.basename(gig.flyer);
    const outputBase = path.basename(gig.image, path.extname(gig.image));
    return generateWebpVariants(sourceName, outputBase, [320, 480, 720, 1000]);
  }),
);
