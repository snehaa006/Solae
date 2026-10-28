import type { CSSProperties } from "react";

/* the shapes sections use to cut into each other (pins: surf shop waves, torn-paper ocean) */
const PATHS = {
  /** small wave, for the marquee band */
  ripple: { h: 24, d: "M0 24V12C60 0 120 0 180 12S300 24 360 12 480 0 540 12 660 24 720 12 840 0 900 12 1020 24 1080 12 1200 0 1260 12 1380 24 1440 12V24Z" },
  wave: { h: 40, d: "M0 0H1440V18C1380 34 1320 34 1260 18S1140 2 1080 18 960 34 900 18 780 2 720 18 600 34 540 18 420 2 360 18 240 34 180 18 60 2 0 18Z" },
  torn: { h: 60, d: "M0 0H1440V22L1412 30 1380 18 1349 34 1310 24 1282 38 1240 20 1214 31 1180 16 1150 33 1118 25 1084 40 1050 22 1020 30 984 14 950 34 921 26 890 38 852 18 826 29 790 15 760 35 728 24 694 39 660 20 632 31 598 17 566 33 534 22 502 38 470 21 440 30 404 13 372 33 344 25 310 40 278 19 250 30 214 16 184 34 152 23 120 37 88 20 58 31 26 17 0 28Z" },
};

interface EdgeProps {
  shape: keyof typeof PATHS;
  /** extra modifiers: edge--flip, edge--top, edge--bottom */
  className?: string;
  style?: CSSProperties;
}

export function Edge({ shape, className, style }: EdgeProps) {
  const { h, d } = PATHS[shape];
  return (
    <svg className={className ? `edge ${className}` : "edge"} style={style} viewBox={`0 0 1440 ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path fill="currentColor" d={d} />
    </svg>
  );
}
