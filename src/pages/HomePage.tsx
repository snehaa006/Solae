import { Catalog } from "../components/home/Catalog";
import { Hero } from "../components/home/Hero";
import { OurStory } from "../components/home/OurStory";
import { Signatures } from "../components/home/Signatures";
import { WaveBand } from "../components/home/WaveBand";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage() {
  usePageMeta("SOLAE — modest swim sets for teen girls");
  return (
    <main id="main">
      <Hero />
      <WaveBand />
      <Catalog />
      <Signatures />
      <OurStory />
    </main>
  );
}
