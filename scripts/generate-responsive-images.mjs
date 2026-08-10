import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const mediaDirectory = path.resolve("public/media");
const gigs = JSON.parse(await readFile("data/gigs.json", "utf8"));

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
