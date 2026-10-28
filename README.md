# Solae

Mock portfolio + store for SOLAE: modest, modern swim sets for teen girls (a one-piece and matching shorts), designed in Saudi Arabia. Colours, logos, story, vision and mission come from the Brand Starter (28 Oct 2026).

- `index.html`: homepage: hero, catalog, lookbook, signatures, and "our story" with her story, the vision and the mission. The hero ends where the chosen logo's sun rises out of the window's edge
- `shop.html`: the shop, as a wide sea chart under the header that works as the category nav. The sea lane writes "Solae" in one dotted line of flowing calligraphy; each category is a small island in and around its loops. Hover an island for what's there, click and the boat sails along the writing. Deep links: `shop.html#swimsuits`, `#signatures`, `#shorts`, `#cover-ups`
- `product.html?p=<id>`: product page, photos as swipeable postcards (ids: `tidepool`, `cabana`, `shallows`, `off-shoulder`, `flounce`, `boardwalk`, `drift`, `white-one`)
- `design-system.html` (private, not linked from the store and kept out of search): the three logo options with mock-ups, colour, type, frames, components and where each section comes from
- `assets/img/logo-sun.svg`, `logo-mark.svg`, `logo-soft-sun.svg`: logo option 1 (Ghalia's sun), option 3's sun symbol and option 2's soft sun. Option 2's wordmark is live text (`.logo-word`)
- `assets/css/tokens.css`: colours, fluid type and spacing, frame masks
- `assets/css/solae.css`: base, logos, frames, components, sections
- `assets/js/solae.js`: product data, ports (categories), catalog filter, bag drawer, shop map, postcard product page

## Logos

None of the three Brand Starter options is final, so the site wears one at a time, everywhere a logo shows (header, menu, the sun at the end of the hero, the story and vision cards, the product welcome card, the footer, the tab icon). The logo bar in the bottom-left corner of every store page switches between them (hide it with ×; add `?logos` to any address to bring it back). Adding `?logo=1`, `?logo=2` or `?logo=3` to an address picks one too. The browser remembers the choice. Everyone else sees `LOGO_DEFAULT` in `assets/js/solae.js` (option 1 for now). The private brand page links to all three.

## Prices

Prices are in Saudi riyals (SAR) and are placeholders until the real ones are set: suits SAR 219–259, shorts SAR 99, cover-ups SAR 149–169, free shipping over SAR 300 (so a matching set ships free). Change them in `PRODUCTS` and `SHIP_FREE` in `assets/js/solae.js`.

## Run it

Run it locally from this folder:

```
python -m http.server 8642
```

Then open http://localhost:8642.

Photos are free-licence stand-ins from Pexels and Unsplash, loaded from their CDNs. Swap them for your own shoot before launch. Poppins (the wordmark's caps), Gloock, Instrument Serif, Inter, Mrs Saint Delafield and Sour Gummy all load free from Google Fonts. The fluid display face is Sour Gummy melted by an SVG filter, our stand-in for the SKIMS / "your hair is thirsty" look.
