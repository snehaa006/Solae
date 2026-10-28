/* Shared SVG symbols (used via <use href="#i-…">) and the #f-fluid filter behind .t-fluid.
   Rendered once at the top of the app. */
export function IconSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <symbol id="i-sun" viewBox="0 0 170 40">
        <path fill="currentColor" d="M2 20.6L118 17.6V22.4Z" />
        <circle cx="146" cy="20" r="8.5" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="4.2" strokeLinecap="round"><path d="M146 2.5V7M146 33V37.5M128.5 20H133M159 20H163.5M133.6 7.6L136.8 10.8M155.2 29.2L158.4 32.4M133.6 32.4L136.8 29.2M155.2 10.8L158.4 7.6" /></g>
      </symbol>
      <symbol id="i-sun-solo" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="8.5" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="4.2" strokeLinecap="round"><path d="M20 2.5V7M20 33V37.5M2.5 20H7M33 20H37.5M7.6 7.6L10.8 10.8M29.2 29.2L32.4 32.4M7.6 32.4L10.8 29.2M29.2 10.8L32.4 7.6" /></g>
      </symbol>
      <symbol id="i-squiggle" viewBox="0 0 72 16">
        <path d="M2 8Q8 1 14 8T26 8T38 8T50 8T62 8T72 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </symbol>
      <symbol id="i-wave" viewBox="0 0 220 80">
        <path d="M10 40Q32 6 55 40T100 40T145 40T190 40" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
        <path d="M30 66Q52 40 75 66T120 66T165 66T210 66" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" opacity=".7" />
      </symbol>
      <symbol id="i-leaf" viewBox="0 0 300 300">
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path strokeWidth="7" d="M40 290Q120 170 270 40" />
          <g strokeWidth="16">
            <path d="M92 214Q60 176 30 170" /><path d="M92 214Q120 232 132 270" />
            <path d="M128 172Q96 128 66 118" /><path d="M128 172Q160 184 178 226" />
            <path d="M166 132Q140 88 110 72" /><path d="M166 132Q198 142 220 180" />
            <path d="M204 94Q186 56 160 36" /><path d="M204 94Q232 98 254 130" />
            <path d="M238 64Q228 36 214 18" /><path d="M238 64Q258 64 280 84" />
          </g>
        </g>
      </symbol>
      <symbol id="i-boat" viewBox="0 0 40 32">
        <path fill="currentColor" d="M19 2V22H4ZM22 6Q32 12 31 22H22Z" />
        <path fill="currentColor" d="M2 24H38L33 30H7Z" />
      </symbol>
      {/* gooey wide type: warps the outline, then melts the corners (.t-fluid) */}
      <filter id="f-fluid" x="-4%" y="-15%" width="108%" height="130%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".004 .009" numOctaves={1} seed={3} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={14} xChannelSelector="R" yChannelSelector="G" result="d" />
        <feGaussianBlur in="d" stdDeviation={1.6} result="b" />
        <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6" />
      </filter>
    </svg>
  );
}
