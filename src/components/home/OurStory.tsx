import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import { Sprite } from "../icons";
import { Logo } from "../Logo";

/** a block that fades up the first time it scrolls into view */
function Reveal({ className, children }: { className: string; children: ReactNode }) {
  const [ref, reveal] = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`${className} ${reveal}`}>{children}</div>;
}

/* the Brand Starter's story, vision and mission (ref: sunseeker's "hi, i'm name" on powder blue,
   then the thank-you card's framed butter panel) */
export function OurStory() {
  const [sketch, sketchIn] = useReveal<HTMLElement>();
  return (
    <section id="about" className="about field field--mist" aria-labelledby="about-title">
      <div className="wrap">
        <div className="story">
          <figure ref={sketch} className={`story__sketch ${sketchIn}`}>
            <Sprite id="s-parasol" className="story__sticker sticker" />
            <div className="story__card"><Logo slot="story" /></div>
            <figcaption className="t-label">where it all began · 2024</figcaption>
          </figure>
          <Reveal className="story__text">
            <p className="t-label">our story</p>
            <h2 id="about-title" className="story__hi">hi, i'm ghalia</h2>
            <p className="story__lede">solae began with a sketch of the sun i drew in 2024, long before i knew how to make a swimsuit.</p>
            <p>growing up in saudi arabia, i struggled to find swimwear that felt right for me. most options were either fully covered or not designed with modesty in mind, and very few were both stylish and comfortable. every summer, i found myself pairing a one-piece with mismatched shorts and wishing there was something better.</p>
            <p>so i decided to create it. solae makes matching swim sets, a one-piece paired with shorts, for girls like me who want coverage, comfort and confidence without giving up on style.</p>
            <p>the name comes from <i>soleil</i>, the french word for sun. to me, it represents what summer should feel like: bright, free and completely your own.</p>
            <p className="t-script" aria-hidden="true">ghalia x</p>
          </Reveal>
        </div>
        <Reveal className="vm framed">
          <p className="trio t-label"><span>coverage</span><span>comfort</span><span>confidence</span></p>
          <span className="vm__mark" aria-hidden="true"><Logo slot="mark" /></span>
          <div className="vm__grid">
            <div>
              <h3 className="t-label">our vision</h3>
              <p>to become the gulf's most-loved swimwear brand for teen girls, where modesty and style go hand in hand.</p>
            </div>
            <div>
              <h3 className="t-label">our mission</h3>
              <p>solae creates modest, modern swim sets for teen girls: designed for comfort, made for confidence, and true to who they are.</p>
            </div>
          </div>
          <p className="trio t-label"><span>modest</span><span>modern</span><span>made for the sun</span></p>
        </Reveal>
      </div>
    </section>
  );
}
