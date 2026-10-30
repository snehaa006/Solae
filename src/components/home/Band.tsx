import { Ticker } from "../Ticker";

const WHY = [
  "removable pads", <em key="d">double-lined</em>, "knee-length shorts", <em key="m">matching cover-ups</em>,
  "coverage, comfort & confidence",
];

/* the big serif ticker under the hero (ref: the beach bar's "good drinks, great vibes") */
export function Band() {
  return <Ticker className="band ticker--lg field field--mist" label="why solae" items={WHY} />;
}
