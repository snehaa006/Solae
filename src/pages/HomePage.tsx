import { Band } from "../components/home/Band";
import { Catalog } from "../components/home/Catalog";
import { Different } from "../components/home/Different";
import { Hero } from "../components/home/Hero";
import { OurStory } from "../components/home/OurStory";
import { Signatures } from "../components/home/Signatures";
import { usePageMeta } from "../hooks/usePageMeta";

/* one flat colour field after another, with checker ribbons round the coral one */
export function HomePage() {
  usePageMeta("SOLAE — modest swim sets for teen girls");
  return (
    <main id="main">
      <Hero />
      <Band />
      <Catalog />
      <Signatures />
      <div className="ribbon" aria-hidden="true" />
      <Different />
      <div className="ribbon" aria-hidden="true" />
      <OurStory />
    </main>
  );
}
