import { realNames } from "./utils";

export default function ByParticipant({ refined }) {
  return Object.keys(refined).map((participant) => (
    <div className="infoBlock">
      <h2>Participant: {realNames[participant] || participant + "?"}</h2>
      <p>Buy volume: {refined[participant].buyVolume}</p>
      <p>Buy total: {refined[participant].buyTotal}</p>
      <p>Sell volume: {refined[participant].sellVolume}</p>
      <p>Sell volume: {refined[participant].sellTotal}</p>
      <p>
        <b>Change in holdings:</b>
      </p>
      <p>
        SHARES:{" "}
        {refined[participant].buyVolume - refined[participant].sellVolume}
      </p>
      <p>
        MONEY: {refined[participant].buyTotal - refined[participant].sellTotal}
      </p>
    </div>
  ));
}
