# Dystekt

Official website for Dystekt, a melodic death metal band from Cologne, Germany.

## Pages

- `/` — band introduction and social links
- `/gigs` — upcoming dates, details, and flyers
- `/music` — the current sneak peek player and lossless download
- `/downloads` — press kit, tech rider, and future downloadable resources
- `/imprint` — contact, legal notice, and privacy information

Gig entries and reusable venues live in `data/gigs.json`. An event's `startDate`
supplies its URL date and every displayed date format, while `venueId` references an
entry in `venues`. Venue display addresses and structured data are derived from its
`name`, `street`, `postalCode`, `city`, and `country`. Event structured data also uses
`endDate`, `presalePrice`, `doorPrice`, `organizer`, `website`, and `ticket`.
`website` is the official event page, while `ticket` must point directly to the presale page. Each event also has a `bands` array containing the participating bands and their
Instagram URLs. Set `info` to an array of
heading/paragraph sections to show formatted copy on an event detail page, or to `null`
to omit it. Music and audio-player entries live in
`data/music.json`; downloadable resources live in `data/downloads.json`. Add
the referenced source files under `public/media/`. `npm run build` regenerates responsive
WebP variants for the band photo and every event flyer before exporting the site.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## GitHub Pages

Run `npm run build` to generate the complete static website in `out/`. The
included GitHub Actions workflow publishes that directory, and `npm run deploy`
can publish it manually through the `gh-pages` package. The generated output
includes `CNAME` for `dystekt.band` and a `.nojekyll` marker.

Run the production build and static-output checks together with `npm test`.

## SEO deployment checklist

- Verify `https://dystekt.band` in Google Search Console and Bing Webmaster Tools.
- Submit `https://dystekt.band/sitemap.xml` in both services.
- Inspect the generated event URLs with Google's Rich Results Test after deployment.
- Confirm that `https://www.dystekt.band` continues to redirect to the apex domain over HTTPS.
