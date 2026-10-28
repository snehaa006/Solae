import type { CSSProperties } from "react";

/* the shapes sections use to cut into each other (pins: surf shop waves, torn-paper ocean) */
const PATHS = {
  /** small wave, for the marquee band */
  ripple: { h: 24, d: "M0 24V12C60 0 120 0 180 12S300 24 360 12 480 0 540 12 660 24 720 12 840 0 900 12 1020 24 1080 12 1200 0 1260 12 1380 24 1440 12V24Z" },
  wave: { h: 40, d: "M0 0H1440V18C1380 34 1320 34 1260 18S1140 2 1080 18 960 34 900 18 780 2 720 18 600 34 540 18 420 2 360 18 240 34 180 18 60 2 0 18Z" },
  torn: { h: 60, d: "M0 0H1440V22L1412 30 1380 18 1349 34 1310 24 1282 38 1240 20 1214 31 1180 16 1150 33 1118 25 1084 40 1050 22 1020 30 984 14 950 34 921 26 890 38 852 18 826 29 790 15 760 35 728 24 694 39 660 20 632 31 598 17 566 33 534 22 502 38 470 21 440 30 404 13 372 33 344 25 310 40 278 19 250 30 214 16 184 34 152 23 120 37 88 20 58 31 26 17 0 28Z" },
  tornAlt: { h: 60, d: "M0 0H1440V26L1404 18 1376 34 1342 22 1310 37 1276 16 1246 30 1214 21 1180 38 1150 19 1118 32 1088 15 1054 35 1022 24 990 39 958 20 926 31 894 14 862 33 830 22 798 37 766 18 734 30 702 23 670 39 638 17 606 32 574 21 542 36 510 15 478 29 446 24 414 40 382 19 350 31 318 16 286 34 254 22 222 38 190 18 158 30 126 21 94 36 62 17 30 29 0 20Z" },
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
