# Solae

Mock portfolio + store for SOLAE: modest, modern swim sets for teen girls (a one-piece and matching shorts), designed in Saudi Arabia. Colours, logos, story, vision and mission come from the Brand Starter (28 Oct 2026).

- `index.html`: homepage. The hero ends where Ghalia's sun (logo 1) rises out of the window's edge; "our story" carries her story, the vision and the mission
- `shop.html`: the shop, as a wide sea chart under the header that works as the category nav. The sea lane writes "Solae" in one dotted line of flowing calligraphy; each category is a small island in and around its loops. Hover an island for what's there, click and the boat sails along the writing. Deep links: `shop.html#swimsuits`, `#signatures`, `#shorts`, `#cover-ups`
- `product.html?p=<id>`: product page, photos as swipeable postcards (ids: `tidepool`, `cabana`, `shallows`, `off-shoulder`, `flounce`, `boardwalk`, `drift`, `white-one`)
- `design-system.html`: the three logo options with mock-ups, colour, type, frames, components and where each section comes from
- `assets/img/logo-sun.svg`, `logo-mark.svg`: logo options 1 (Ghalia's sun) and 3 (the sun symbol, also the tab icon). Option 2, the wordmark, is live text (`.logo-word`)
- `assets/css/tokens.css`: colours, fluid type and spacing, frame masks
- `assets/css/solae.css`: base, logos, frames, components, sections
- `assets/js/solae.js`: product data, ports (categories), catalog filter, bag drawer, logo switch, shop map, postcard product page

## Logos

None of the three is final. The wordmark (option 2) is the default header logo. A small switch in the bottom-left corner of every store page tries options 1, 2 and 3 in the header and menu, and remembers the choice in that browser. Hide it with ×; add `?logos` to any address to bring it back.

## Prices

Prices are in Saudi riyals (SAR) and are placeholders until the real ones are set: suits SAR 219–259, shorts SAR 99, cover-ups SAR 149–169, free shipping over SAR 300 (so a matching set ships free). Change them in `PRODUCTS` and `SHIP_FREE` in `assets/js/solae.js`.

## Run it

Run it locally from this folder:

```
python -m http.server 8642
```

Then open http://localhost:8642.

Photos are free-licence stand-ins from Pexels and Unsplash, loaded from their CDNs. Swap them for your own shoot before launch. Poppins (the wordmark's caps), Gloock, Instrument Serif, Inter, Mrs Saint Delafield and Sour Gummy all load free from Google Fonts. The fluid display face is Sour Gummy melted by an SVG filter, our stand-in for the SKIMS / "your hair is thirsty" look.
