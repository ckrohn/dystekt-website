# Dystekt

Official website for Dystekt, a melodic death metal band from Cologne, Germany.

## Pages

- `/` — band introduction and social links
- `/gigs` — upcoming dates, details, and flyers
- `/music` — the current sneak peek player and lossless download
- `/imprint` — contact, legal notice, and privacy information

Gig entries live in `data/gigs.json`; music and audio-player entries live in
`data/music.json`. Add the referenced flyers and audio files under
`public/media/`.

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
includes `CNAME` for `www.dystekt.band` and a `.nojekyll` marker.

Run the production build and static-output checks together with `npm test`.
