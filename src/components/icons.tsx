import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const line = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" } as const;

export const PlusIcon = (props: IconProps) => (
  <svg {...line} width="16" height="16" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}><path d="M12 5v14M5 12h14" /></svg>
);
export const PrevIcon = (props: IconProps) => (
  <svg {...line} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const NextIcon = (props: IconProps) => (
  <svg {...line} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const MenuIcon = () => (
  <svg {...line} strokeWidth="1.8" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
);
export const CloseIcon = () => (
  <svg {...line} strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const SearchIcon = () => (
  <svg {...line} strokeWidth="1.7"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" strokeLinecap="round" /></svg>
);
export const BagIcon = () => (
  <svg {...line} strokeWidth="1.7" strokeLinejoin="round"><path d="M5 8h14l-1.2 12H6.2Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const SendIcon = () => (
  <svg {...line} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
);
export const InstagramIcon = () => (
  <svg {...line} strokeWidth="1.7"><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".9" fill="currentColor" /></svg>
);
export const PinterestIcon = () => (
  <svg {...line} strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M11 9.5c.6-1.6 4.2-1.5 4.2 1.2 0 2.2-1.6 3.6-3 3.3M11.6 10.5 9.6 19" /></svg>
);
export const HeartIcon = () => (
  <svg {...line} strokeWidth="1.7"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
);
export const TruckIcon = () => (
  <svg {...line} strokeWidth="1.7"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></svg>
);
export const ExchangeIcon = () => (
  <svg {...line} strokeWidth="1.7"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" /></svg>
);
export const DropIcon = () => (
  <svg {...line} strokeWidth="1.7"><path d="M12 3c3 3.5 6 6.6 6 10a6 6 0 0 1-12 0c0-3.4 3-6.5 6-10Z" /></svg>
);

/** the little sun used between marquee phrases */
export const SunMark = () => (
  <svg className="sunmark sunmark--solo" aria-hidden="true"><use href="#i-sun-solo" /></svg>
);

/** a symbol from the sprite, e.g. <Sprite id="i-boat" className="…" /> */
export const Sprite = ({ id, ...props }: IconProps & { id: string }) => (
  <svg aria-hidden="true" {...props}><use href={`#${id}`} /></svg>
);
