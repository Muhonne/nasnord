import { mmtCalc, mmtDecode } from "./utils";

export default function MmtFlags({ data }) {
  const flags = mmtCalc(data);
  return (
    <div className="mmtBlocksList">
      <h3>MMT Flags (algos galore) <a href="https://www.nasdaq.com/docs/Nasdaq-Nordic-Equity-Last-Sale-1.2.7.pdf">?</a></h3>
      <div className="mmt">
        {Object.keys(flags).map((f) => {
          return (
            <div key={f} className="mmtBlock">
              <p>{f}</p>
              <p>{flags[f]} <span className="mmtCount">{Number.parseInt(flags[f] / data.length*100)}%</span> share of orders</p>
              <p className="mmtDecoded">Decoded:</p>
              <p className="mmtLine">
                {mmtDecode(f).map((p) => (
                  <p>-{p}</p>
                ))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
