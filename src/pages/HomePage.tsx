import { About } from "../components/home/About";
import { Catalog } from "../components/home/Catalog";
import { FoundersPostcard } from "../components/home/FoundersPostcard";
import { Hero } from "../components/home/Hero";
import { Lookbook } from "../components/home/Lookbook";
import { Signatures } from "../components/home/Signatures";
import { Social } from "../components/home/Social";
import { Statement } from "../components/home/Statement";
import { WaveBand } from "../components/home/WaveBand";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage() {
  usePageMeta("SOLAE — swim, by teens for teens");
  return (
    <main id="main">
      <Hero />
      <WaveBand />
      <Catalog />
      <Lookbook />
      <Signatures />
      <FoundersPostcard />
      <About />
      <Statement />
      <Social />
    </main>
  );
}
