# Solae

Mock portfolio + store for SOLAE: modest, modern swim sets for teen girls (a one-piece and matching shorts), designed in Saudi Arabia. Colours, logos, story, vision and mission come from the Brand Starter (28 Oct 2026).

Built with React 19, TypeScript, Vite and React Router.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:5173.

- `npm run build`: typecheck, then build to `dist/`
- `npm run preview`: serve the production build
- `npm run typecheck`, `npm run lint`

## Pages

- `/`: homepage: hero, catalog, signatures, and "our story" with her story, the vision and the mission. The hero ends where the chosen logo's sun rises out of the window's edge
- `/shop`: the shop, as a wide sea chart under the header that works as the category nav. The sea lane writes "Solae" in one dotted line of flowing calligraphy; each category is a small island in and around its loops. Hover an island for what's there, click and the boat sails along the writing. Deep links: `/shop/swimsuits`, `/shop/signatures`, `/shop/shorts`, `/shop/cover-ups`
- `/product/<id>`: product page: the swipeable postcard stack beside a minimal panel after k2o (colour and size, the set or just the suit, a facts strip), then reviews and pairs well with (ids: `tidepool`, `cabana`, `shallows`, `off-shoulder`, `flounce`, `boardwalk`, `drift`, `white-one`)
- `/design-system` (private: not linked from the store, and `vercel.json` sends it to the homepage on the live site, so open it locally): the three logo options with mock-ups, colour, type, frames, components and where each section comes from

## Where things live

- `src/data/catalog.ts`: products, colours, sizes, prices, ports (categories) and the facts strip
- `src/data/reviews.ts`: product reviews
- `src/lib/logos.ts`: which logo option the site wears; `src/components/Logo.tsx` draws each option and the logo bar
- `src/context/`: the bag (saved to localStorage) and the toast
- `src/components/layout/`: announcement bar, header, mobile menu, footer, bag drawer
- `src/components/home/`: homepage sections
- `src/components/shop/`: the sea chart (`chart.ts` holds its geometry, `SeaChart.tsx` the boat and hover cards) and the port panel
- `src/components/product/`: postcards, the info panel and reviews
- `src/pages/`: one component per route
- `src/styles/tokens.css`: colours, fluid type and spacing, frame masks
- `src/styles/solae.css`: base, logos, frames, components, sections
- `src/styles/design-system.css`: design-system page only, scoped under `.ds-page`
- `public/img/logo-sun.svg`, `logo-sun-up.svg`, `logo-mark.svg`, `logo-soft-sun.svg`: logo option 1 (Ghalia's sun, and turned upright as a sunrise for the header), option 3's sun symbol and option 2's soft sun. Option 2's wordmark is live text (`.logo-word`)

## Logos

None of the three Brand Starter options is final, so the site wears one at a time, everywhere a logo shows (header, menu, the sun at the end of the hero, the story and vision cards, the product welcome card, the footer, the tab icon). The logo bar in the bottom-left corner of every store page switches between them (hide it with ×; add `?logos` to any address to bring it back). Adding `?logo=1`, `?logo=2` or `?logo=3` to an address picks one too. The browser remembers the choice. Everyone else sees `LOGO_DEFAULT` in `src/lib/logos.ts` (option 1 for now). The brand page (local only) links to all three.

## Reviews

Each product page has a reviews section. Real reviews go in `REVIEWS` in `src/data/reviews.ts` as they come in; until a piece has some, its page says "no reviews yet". Add `?reviews=sample` to a product address (for example `/product/tidepool?reviews=sample`) to preview the layout with made-up reviews, which visitors never see.

## Prices

Prices are in Saudi riyals (SAR) and are placeholders until the real ones are set: suits SAR 219–259, shorts SAR 99, cover-ups SAR 149–169, free shipping over SAR 300 (so a matching set ships free). Change them in `PRODUCTS` and `SHIP_FREE` in `src/data/catalog.ts`.

## Deploying

The app uses browser routing, so the host has to serve `index.html` for every path. `vercel.json` does this on Vercel (and keeps the brand page off the live site); on another host, add the usual SPA rewrite.

The CSS ships unminified on purpose: Vite's default CSS minifier (Lightning CSS) drops or reorders `translate` when a rule also sets `transform`, which moves the postcard titles, the toast and the map's hover card. See `vite.config.ts`.

Photos are free-licence stand-ins from Pexels and Unsplash, loaded from their CDNs. Swap them for your own shoot before launch. Poppins (the wordmark's caps), Gloock, Instrument Serif, Inter, Mrs Saint Delafield and Sour Gummy all load free from Google Fonts, plus a few faces only the product postcards use. The fluid display face is Sour Gummy melted by an SVG filter, our stand-in for the SKIMS / "your hair is thirsty" look.
