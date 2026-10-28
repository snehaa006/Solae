# Solae

Mock portfolio + store for SOLAE, a swim label by teens, for teens.

- `index.html`: homepage
- `shop.html`: the shop, as a small sea chart beside the title that works as the category nav. The sea lane writes "solae" in one dotted line; each category is a small island beside it. Hover an island for what's there, click and the boat sails along the writing. Deep links: `shop.html#swimsuits`, `#signatures`, `#shorts`, `#cover-ups`, `#skirts`
- `product.html?p=<id>`: product page, photos as swipeable postcards (ids: `tidepool`, `cabana`, `shallows`, `off-shoulder`, `flounce`, `boardwalk`, `drift`, `white-one`, `shoreline`)
- `design-system.html`: tokens, type, frames, components and where each section comes from
- `assets/css/tokens.css`: colours, fluid type and spacing, frame masks
- `assets/css/solae.css`: base, frames, components, sections
- `assets/js/solae.js`: product data, ports (categories), catalog filter, bag drawer, shop map, postcard product page

Run it locally from this folder:

```
python -m http.server 8642
```

Then open http://localhost:8642.

Photos are free-licence stand-ins from Pexels and Unsplash, loaded from their CDNs. Swap them for your own shoot before launch. k2o's Moslin and TT Turns are licensed fonts, so free Google stand-ins (Unbounded, Inter) render for now. The fluid display face is Sour Gummy (free, Google Fonts) melted by an SVG filter, our stand-in for the SKIMS / "your hair is thirsty" look.
