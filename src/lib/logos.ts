/* The Brand Starter's three logo options, nothing final. The site wears one at a time,
   everywhere a logo shows: header, menu, the sun at the end of the hero, the story
   and vision cards, the product welcome card, the footer and the tab icon.
   The bar in the bottom-left corner switches between them (hide it with ×, bring it
   back with ?logos); ?logo=1, 2 or 3 in the address picks one too. This browser
   remembers the choice; everyone else sees LOGO_DEFAULT. */
import { useSyncExternalStore } from "react";
import { storage } from "./format";

export const LOGO_OPTIONS = ["1", "2", "3"] as const;
export type LogoOption = (typeof LOGO_OPTIONS)[number];
export const LOGO_DEFAULT: LogoOption = "1";

export const LOGO_INFO: Record<LogoOption, { name: string; icon: string }> = {
  "1": { name: "ghalia's sun", icon: "/img/logo-sun.svg" },
  "2": { name: "minimal wordmark", icon: "/img/logo-soft-sun.svg" },
  "3": { name: "sun symbol and name", icon: "/img/logo-mark.svg" },
};

const LOGO_KEY = "solae-logo-option";
const BAR_KEY = LOGO_KEY + "-bar";
const isOption = (v: unknown): v is LogoOption => LOGO_OPTIONS.includes(v as LogoOption);

/* the chosen logo lives outside React so the page can wear it before the first render */
let logo: LogoOption = LOGO_DEFAULT;
let barOn = true;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(l => l());
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

function apply() {
  document.documentElement.dataset.logo = logo;
  document.querySelector('link[rel="icon"]')?.setAttribute("href", LOGO_INFO[logo].icon);
}

export function setLogo(opt: string | null, remember = false) {
  logo = isOption(opt) ? opt : LOGO_DEFAULT;
  if (remember) storage.set(LOGO_KEY, logo);
  apply();
  notify();
}

export function hideLogoBar() {
  barOn = false;
  storage.set(BAR_KEY, "off");
  notify();
}

/** read ?logo= and ?logos from an address (on arrival, and on every client-side navigation) */
export function readLogoParams(search: string) {
  const params = new URLSearchParams(search);
  if (params.has("logos")) { storage.set(BAR_KEY, "on"); barOn = true; notify(); }
  const q = params.get("logo");
  if (isOption(q) && q !== logo) setLogo(q, true);
}

barOn = storage.get(BAR_KEY) !== "off";
setLogo(storage.get(LOGO_KEY));
readLogoParams(location.search);

export const useLogo = () => useSyncExternalStore(subscribe, () => logo);
export const useLogoBar = () => useSyncExternalStore(subscribe, () => barOn);
