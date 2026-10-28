# Solae

Mock portfolio + store for SOLAE, a swim label by teens, for teens.

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

- `/`: homepage
- `/shop`: the shop, as a small sea chart centred under the header that works as the category nav. The sea lane writes "solae" in one dotted line; each category is a small island beside it. Hover an island for what's there, click and the boat sails along the writing. Deep links: `/shop/swimsuits`, `/shop/signatures`, `/shop/shorts`, `/shop/cover-ups`, `/shop/skirts`
- `/product/<id>`: product page, photos as swipeable postcards (ids: `tidepool`, `cabana`, `shallows`, `off-shoulder`, `flounce`, `boardwalk`, `drift`, `white-one`, `shoreline`)
- `/design-system`: tokens, type, frames, components and where each section comes from

## Where things live

- `src/data/catalog.ts`: products, colours, sizes and ports (categories)
- `src/context/`: the bag (saved to localStorage) and the toast
- `src/components/layout/`: announcement bar, header, mobile menu, footer, bag drawer
- `src/components/home/`: homepage sections
- `src/components/shop/`: the sea chart (`chart.ts` holds its geometry, `SeaChart.tsx` the boat and hover cards) and the port panel
- `src/components/product/`: postcards and the buy panel
- `src/pages/`: one component per route
- `src/styles/tokens.css`: colours, fluid type and spacing, frame masks
- `src/styles/solae.css`: base, frames, components, sections
- `src/styles/design-system.css`: design-system page only, scoped under `.ds-page`

The app uses browser routing, so a static host has to serve `index.html` for every path (on Netlify, Vercel or similar, add the usual SPA rewrite).

Photos are free-licence stand-ins from Pexels and Unsplash, loaded from their CDNs. Swap them for your own shoot before launch. k2o's Moslin and TT Turns are licensed fonts, so free Google stand-ins (Unbounded, Inter) render for now. The fluid display face is Sour Gummy (free, Google Fonts) melted by an SVG filter, our stand-in for the SKIMS / "your hair is thirsty" look.
