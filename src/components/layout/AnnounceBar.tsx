import { SunMark } from "../icons";

const Phrases = () => (
  <>drop 01 is live <SunMark /> free shipping across india over ₹2,999 <SunMark /> by teens, for teens <SunMark /></>
);

export function AnnounceBar() {
  return (
    <div className="announce" aria-label="announcements">
      <div className="announce__track t-label">
        <span><Phrases /></span>
        <span aria-hidden="true"><Phrases /></span>
      </div>
    </div>
  );
}
