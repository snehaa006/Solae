import { Edge } from "../edges";
import { SunMark } from "../icons";

const Phrases = () => (
  <>removable pads <SunMark /> double-lined <SunMark /> knee-length shorts <SunMark /> matching cover-ups <SunMark /> <em>by teens, for teens</em> <SunMark /></>
);

export function WaveBand() {
  return (
    <div className="band" aria-label="why solae">
      <Edge shape="ripple" />
      <div className="band__body">
        <div className="band__track t-wide">
          <span><Phrases /></span>
          <span aria-hidden="true"><Phrases /></span>
        </div>
      </div>
      <Edge shape="ripple" className="edge--flip" />
    </div>
  );
}
