import type { ReactNode } from "react";
import { hideLogoBar, LOGO_INFO, LOGO_OPTIONS, setLogo, useLogo, useLogoBar, type LogoOption } from "../lib/logos";

/** where a logo sits: full (the whole logo), bar (header and menu), hero (its sun alone, rising
    out of the bottom edge of the hero's striped card), mark (small, for the vision card), story (the story card) */
export type LogoSlot = "full" | "bar" | "hero" | "mark" | "story";

const SUN = <img className="logo-sun" src="/img/logo-sun.svg" alt="" />;
const SUN_UP = <img className="logo-sun-up" src="/img/logo-sun-up.svg" alt="" />;
const WORD = <span className="logo-word">S<i />LAE</span>;
const SOFT_SUN = <i className="sun-soft" />;
const MARK = <span className="logo-mark"><img src="/img/logo-mark.svg" alt="" /><span>SOLAE</span></span>;
const MARK_SUN = <img className="sun-mark" src="/img/logo-mark.svg" alt="" />;

const ART: Record<LogoOption, Record<LogoSlot, ReactNode>> = {
  // option 1 turns upright in the header, menu and hero: a sunrise sitting on an edge
  "1": { full: SUN, bar: SUN_UP, hero: SUN_UP, mark: SUN,
         story: <img className="logo-sun" src="/img/logo-sun.svg" alt="Ghalia's drawing: a half sun with the letters s, o, l, a, e running up its edge and wavy beams" /> },
  "2": { full: WORD, bar: WORD, hero: SOFT_SUN, mark: SOFT_SUN,
         story: <span className="logo-word" role="img" aria-label="Solae: the name in spaced capitals with a soft sun for the O">S<i />LAE</span> },
  "3": { full: MARK, bar: MARK, hero: MARK_SUN, mark: MARK_SUN,
         story: <span className="logo-mark" role="img" aria-label="Solae: Ghalia's sun as a symbol, with the name underneath"><img src="/img/logo-mark.svg" alt="" /><span>SOLAE</span></span> },
};

/** the chosen logo option, drawn for one slot */
export function Logo({ slot = "full" }: { slot?: LogoSlot }) {
  return ART[useLogo()][slot];
}

/** the switcher in the bottom-left corner of every store page */
export function LogoLab() {
  const current = useLogo();
  if (!useLogoBar()) return null;
  return (
    <div className="logo-lab" role="group" aria-label="try a logo">
      <span>logo</span>
      {LOGO_OPTIONS.map(k => {
        const label = `option ${k}: ${LOGO_INFO[k].name}`;
        return <button key={k} type="button" aria-pressed={current === k} title={label} aria-label={label} onClick={() => setLogo(k, true)}>{k}</button>;
      })}
      <button className="logo-lab__x" type="button" title="hide" aria-label="hide the logo bar" onClick={hideLogoBar}>×</button>
    </div>
  );
}
