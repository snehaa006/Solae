import { Catalog } from "../components/home/Catalog";
import { Different } from "../components/home/Different";
import { Hero } from "../components/home/Hero";
import { MatchingSet } from "../components/home/MatchingSet";
import { OurStory } from "../components/home/OurStory";
import { Signatures } from "../components/home/Signatures";
import { Perks } from "../components/Perks";
import { Ticker } from "../components/Ticker";
import { WaveTicker } from "../components/WaveTicker";
import { usePageMeta } from "../hooks/usePageMeta";

const WHY = ["made to match", "double-lined", "knee-length shorts", "matching cover-ups", "coverage, comfort & confidence"];
const STRIP = ["modest swim sets for teen girls", "made to match", "designed in saudi arabia"];
const PERKS: [string, string][] = [["i-shell", "double-lined"], ["i-sun-line", "removable pads"], ["i-wave", "knee-length shorts"], ["i-palm", "designed in saudi arabia"]];

/* The client's three main references, section by section: the swimwear thank-you card (hero), the
   beauty site (strip + benefits row, the product feature, the wave ribbon, the split story) and the
   interiors site (signatures, checker ribbons, how we're different, "it's our whole vibe…") */
export function HomePage() {
  usePageMeta("SOLAE — modest swim sets for teen girls");
  return (
    <main id="main">
      <Hero />
      <Ticker className="strip" label="about solae" items={STRIP} />
      <Perks items={PERKS} />
      <Catalog />
      <Signatures />
      <div className="ribbon" aria-hidden="true" />
      <Different />
      <div className="ribbon" aria-hidden="true" />
      <MatchingSet />
      <WaveTicker label="why solae" items={WHY} />
      <OurStory />
    </main>
  );
}
