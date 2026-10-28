import type { ReactNode } from "react";
import type { Deco, DecoKind } from "./chart";

/* little marks drawn on and around the islands, origin at their foot */
const DECO: Record<DecoKind, ReactNode> = {
  palm: <>
    <path className="m-trunk" d="M0 0C-2-12 1-24 6-34" />
    <path className="m-frond" d="M6-34C-2-43-15-41-21-32C-11-37-3-36 6-34ZM6-34C14-45 27-43 31-33C21-38 13-37 6-34ZM6-34C2-47 9-55 17-55C11-49 8-42 6-34ZM6-34C-5-36-13-28-13-19C-7-28 0-32 6-34ZM6-34C17-36 25-28 25-19C19-28 12-32 6-34Z" />
    <circle className="m-nut" cx="4" cy="-31" r="2.2" /><circle className="m-nut" cx="9" cy="-32" r="2.2" />
  </>,
  light: <>
    <path className="m-tower" d="M-9 0L-6-42H6L9 0Z" /><path className="m-band" d="M-8.3-10H8.3L7.7-19H-7.7ZM-7.1-28H7.1L6.6-35H-6.6Z" />
    <rect className="m-lamp" x="-6" y="-50" width="12" height="8" /><path className="m-band" d="M-8-50L0-59L8-50Z" />
  </>,
  umbrella: <><path className="m-line" d="M0 0V-26" /><path className="m-canopy" d="M-20-24Q0-44 20-24Z" /><path className="m-canopy-stripe" d="M-7-24Q-4-38 0-39Q-1-31 -2-24ZM7-24Q4-38 0-39Q1-31 2-24Z" /></>,
  hut: <><path className="m-hut" d="M-15 0V-17H15V0Z" /><path className="m-door" d="M-4 0V-10H4V0Z" /><path className="m-roof" d="M-20-16L0-32L20-16Z" /><path className="m-line" d="M-12-18L0-28M-4-17L6-26M4-17L12-23" /></>,
  x: <><path className="m-trail" d="M-50 8C-40 18-24 2-12 7" /><path className="m-x" d="M-6-6L6 6M6-6L-6 6" /></>,
  whale: <><path className="m-whale" d="M0 0C-1-7 0-13 3-17C-3-19-9-23-11-29C-5-27 0-25 4-21C8-25 14-27 20-29C18-23 12-19 6-17C9-13 10-7 8 0Z" /><path className="m-wave" d="M-16 2q5-5 10 0t10 0 10 0 10 0" /></>,
  fish: <><path className="m-fish" d="M0 0C6-7 17-7 24 0C17 7 6 7 0 0ZM1 0L-8-6V6Z" /><circle className="m-eye" cx="18" cy="-1" r="1.4" /></>,
};

export const DecoMark = ({ deco: [k, x, y, s = 1] }: { deco: Deco }) => (
  <g className={`m-${k}`} transform={`translate(${x} ${y}) scale(${s})`}>{DECO[k]}</g>
);

/* the boat — bow to the right, waterline at 0. Striped sails, a wooden hull, and
   a curling stern wave + bow spray that only show while it's sailing */
export const ShipArt = () => (
  <>
    <g className="ship__curl">
      <path className="curl__body" d="M-132 6C-112 4-98-2-88-14C-80-24-74-36-62-40C-50-44-40-38-38-30C-44-35-52-34-55-28C-58-22-54-15-47-15C-44-8-40 0-34 6Z" />
      <path className="curl__face" d="M-84 6C-78-4-74-14-68-22C-66-12-60-6-50-4C-46 0-42 4-38 6Z" />
      <path className="curl__line" d="M-118 2C-104 0-96-6-90-14M-74-12C-70-4-62 0-54 0" />
      <path className="curl__foam" d="M-62-40C-50-44-40-38-38-30C-41-33-44-33-46-31C-47-35-51-37-55-36C-56-39-59-40-62-40Z" />
    </g>
    <path className="ship__mast" d="M-6-18V-90M24-18V-70" />
    <path className="ship__rig" d="M-6-90L-44-24M-6-90L44-22M24-70L62-28" />
    <path className="ship__jib" d="M25-66L62-28L30-26Z" />
    <path className="ship__sail" d="M-28-64Q-6-68 16-64Q20-45 18-26Q-6-20-30-26Q-32-45-28-64Z" />
    <path className="ship__sail" d="M-22-86Q-6-89 10-86Q13-77 12-68Q-6-65-24-68Q-25-77-22-86Z" />
    <path className="ship__sail" d="M10-62Q24-65 38-62Q41-46 39-30Q24-25 9-30Q7-46 10-62Z" />
    <path className="ship__flag" d="M-6-92C-14-95-22-89-32-92L-26-86L-32-81C-22-79-14-85-6-82Z" />
    <path className="ship__hull" d="M-50-28H-30V-20H46L62-28C58-10 48 2 34 6H-34C-45 1-50-12-50-28Z" />
    <path className="ship__deck" d="M-50-28H-30V-20H-50Z" />
    <path className="ship__band" d="M-49-12H54" />
    <path className="ship__plank" d="M-46-4H48M-40 2H40" />
    <rect className="ship__win" x="-46" y="-26" width="6" height="5" rx="1" /><rect className="ship__win" x="-37" y="-26" width="6" height="5" rx="1" />
    {[-24, -8, 8, 24].map(x => <circle key={x} className="ship__port" cx={x} cy="-16" r="2" />)}
    <g clipPath="url(#ship-water)"><path className="ship__water" d={`M-90 8${"q6-5 12 0t12 0".repeat(8)}`} /></g>
    <g className="ship__spray"><path d="M64-14q8-8 14-2" /><path d="M66-6q10-4 16 2" /><path d="M62 0q8 0 12 6" /></g>
  </>
);
