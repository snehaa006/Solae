# Solae

Mock portfolio + store for SOLAE: modest, modern swim sets for teen girls (a one-piece and matching shorts), designed in Saudi Arabia. Colours, logos, story, vision and mission come from the Brand Starter (28 Oct 2026).

## The look (design system v2, "riviera", 30 Oct 2026)

Re-set after the client's second round of boards, which asked for something more elegant and simple. The brand colours are unchanged; how they're used changed:

- **Colour fields:** each section is one flat colour (cream, lagoon mist, olive, coral, sun wash, deep teal), with checker ribbons between olive, coral and mist. No grain or paper texture.
- **Type:** Playfair Display for headlines, lowercase with a word or two in italic ("how we're *different*"); DM Mono for tiny tracked caps (labels, nav, buttons, tickers); Jost for body; Pinyon Script as one accent per view.
- **Motifs:** cabana stripes and a thick-framed butter card (the swimwear thank-you card), tickers, oval / scalloped / arch photo frames with a hairline, thin line drawings and one die-cut sticker.
- **Controls:** rectangles with tiny caps instead of pills.

Everything is documented, with live demos, on the private `/design-system` page.

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

- `/`: homepage: the hero (a cabana-striped card and a framed butter card over a beach photo, the chosen logo's sun rising out of the striped card), a big serif ticker, the catalog, the signatures on olive, "how we're different" on coral, and "our story" on lagoon mist with her story, the vision and the mission
- `/shop`: the shop, as a wide sea chart under the header that works as the category nav. The sea lane writes "Solae" in one dotted line of flowing calligraphy; each category is a small island in and around its loops. Hover an island for what's there, click and the boat sails along the writing. Deep links: `/shop/swimsuits`, `/shop/signatures`, `/shop/shorts`, `/shop/cover-ups`
- `/product/<id>`: product page: the swipeable postcard stack beside a minimal panel after k2o (colour and size, the set or just the suit, a facts strip), then reviews and pairs well with (ids: `tidepool`, `cabana`, `shallows`, `off-shoulder`, `flounce`, `boardwalk`, `drift`, `white-one`)
- `/design-system` (private: not linked from the store, and `vercel.json` sends it to the homepage on the live site, so open it locally): the three logo options with mock-ups, colour and the six fields, type, space and shape, motifs, components and which board each section comes from

## Where things live

- `src/data/catalog.ts`: products, colours, sizes, prices, ports (categories) and the facts strip
- `src/data/reviews.ts`: product reviews
- `src/lib/logos.ts`: which logo option the site wears; `src/components/Logo.tsx` draws each option and the logo bar
- `src/context/`: the bag (saved to localStorage) and the toast
- `src/components/layout/`: announcement bar, header, mobile menu, footer, bag drawer
- `src/components/home/`: homepage sections
- `src/components/Ticker.tsx`, `SectionHead.tsx`: the scrolling strip and the centred section head, shared across pages
- `src/components/shop/`: the sea chart (`chart.ts` holds its geometry, `SeaChart.tsx` the boat and hover cards) and the port panel
- `src/components/product/`: postcards, the info panel and reviews
- `src/pages/`: one component per route
- `src/styles/tokens.css`: colours and tints, fonts, fluid type and spacing, radii
- `src/styles/solae.css`: base, fields, type, logos, motifs, frames, components, sections
- `src/components/IconSprite.tsx`: the shared SVG symbols, including the line drawings and the parasol sticker
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

Photos are free-licence stand-ins from Pexels and Unsplash, loaded from their CDNs. Swap them for your own shoot before launch. Playfair Display, DM Mono, Jost, Pinyon Script and Poppins (the option 2 and 3 wordmark) all load free from Google Fonts, plus a few faces only the product postcards use. 
