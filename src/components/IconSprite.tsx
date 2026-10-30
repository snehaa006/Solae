/* Shared SVG symbols, used via <use href="#i-…">. Rendered once at the top of the app.
   The line drawings (i-sun-line, i-parasol, i-shell, i-palm, i-wave, i-star) are thin
   one-colour strokes after the boards' engravings; draw them with the .ill class. */
export function IconSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      {/* a plain sun dot for the tickers and postmarks; it suits every logo option */}
      <symbol id="i-sun-solo" viewBox="0 0 40 40"><circle cx="20" cy="20" r="9" fill="currentColor" /></symbol>
      <symbol id="i-boat" viewBox="0 0 40 32">
        <path fill="currentColor" d="M19 2V22H4ZM22 6Q32 12 31 22H22Z" />
        <path fill="currentColor" d="M2 24H38L33 30H7Z" />
      </symbol>

      {/* line drawings */}
      <symbol id="i-sun-line" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="11" />
        <path d="M32 15L32 6M40.5 17.3L43 12.9M46.7 23.5L54.5 19M49 32L54 32M46.7 40.5L54.5 45M40.5 46.7L43 51.1M32 49L32 58M23.5 46.7L21 51.1M17.3 40.5L9.5 45M15 32L10 32M17.3 23.5L9.5 19M23.5 17.3L21 12.9" />
      </symbol>
      <symbol id="i-parasol" viewBox="0 0 64 64">
        <path d="M6 30Q32 2 58 30Q51.5 25 45 30Q38.5 25 32 30Q25.5 25 19 30Q12.5 25 6 30Z" />
        <path d="M32 9.5Q24 18 19 30M32 9.5Q40 18 45 30M32 6V9.5M32 30V60M27 60H37" />
      </symbol>
      <symbol id="i-shell" viewBox="0 0 64 64">
        <path d="M32 52C15 49 7 36 10 24C13 13 23 8 32 8S51 13 54 24C57 36 49 49 32 52Z" />
        <path d="M32 52V9M32 52L23 11M32 52L41 11M32 52L15 17M32 52L49 17M32 52L10 28M32 52L54 28M25 52L22 58H42L39 52" />
      </symbol>
      <symbol id="i-palm" viewBox="0 0 64 64">
        <path d="M27 60C28 46 31 34 36 24M22 60H40" />
        <path d="M36 24C28 15 16 15 8 22C18 19 28 20 36 24ZM36 24C42 14 54 13 59 21C50 18 43 19 36 24ZM36 24C34 13 39 5 47 4C42 9 38 15 36 24ZM36 24C26 24 18 31 17 40C23 33 29 27 36 24ZM36 24C46 25 52 32 52 41C47 33 42 28 36 24Z" />
      </symbol>
      <symbol id="i-wave" viewBox="0 0 64 64">
        <path d="M4 26q7-8 14 0t14 0 14 0 14 0M4 36q7-8 14 0t14 0 14 0 14 0M4 46q7-8 14 0t14 0 14 0 14 0" />
      </symbol>
      <symbol id="i-star" viewBox="0 0 64 64">
        <path d="M32 7L38.5 25.1L57.7 25.7L42.5 37.4L47.9 55.8L32 45L16.1 55.8L21.5 37.4L6.3 25.7L25.5 25.1Z" />
        <circle cx="32" cy="22" r="1" /><circle cx="44" cy="31" r="1" /><circle cx="39" cy="45" r="1" /><circle cx="25" cy="45" r="1" /><circle cx="20" cy="31" r="1" />
      </symbol>

      {/* the parasol as a flat sticker: blue and white panels, a white pole (retro motel stickers) */}
      <symbol id="s-parasol" viewBox="0 0 64 64">
        <path fill="#FFFFFF" stroke="#1F3B6F" strokeWidth="1.5" d="M30.5 28H33.5V60H30.5Z" />
        <path fill="#A8CAEC" stroke="#1F3B6F" strokeWidth="1.5" strokeLinejoin="round" d="M4 30Q32 0 60 30Q53 25 46 30Q39 25 32 30Q25 25 18 30Q11 25 4 30Z" />
        <path fill="#FFFFFF" d="M32 4.8Q25 15 18 30Q25 25 32 30Z M32 4.8Q39 15 46 30Q39 25 32 30Z" opacity=".9" />
        <path fill="none" stroke="#1F3B6F" strokeWidth="1.5" strokeLinejoin="round" d="M4 30Q32 0 60 30Q53 25 46 30Q39 25 32 30Q25 25 18 30Q11 25 4 30Z" />
        <circle cx="32" cy="4" r="2" fill="#F8E077" stroke="#1F3B6F" strokeWidth="1.2" />
      </symbol>
    </svg>
  );
}
