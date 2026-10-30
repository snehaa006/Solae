import { Ticker } from "../Ticker";

const NEWS = ["drop 01 is live", "free shipping across saudi arabia over SAR 300", "modest, modern swim sets"];

export function AnnounceBar() {
  return <Ticker className="announce" label="announcements" items={NEWS} />;
}
