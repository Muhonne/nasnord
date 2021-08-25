import Head from "next/head";
import { useState } from "react";
import { CSVReader } from "react-papaparse";
import ByParticipant from "../ByParticipant";
import MmtFlags from "../MmtFlags";

import { refineByParticipant } from "../utils";
import Volumes from "../Volumes";

export default function Home() {
  const [fileData, setFileData] = useState({});
  const [lineCount, setCount] = useState(0);
  const [refined, setRefined] = useState();

  const handleOnDrop = (data) => {
    setCount(data.length);
    setFileData(data);
    // console.log("Month:", data[0]);
    // console.log("Example row:", data[2]);
    console.log("Headers:", data[1]);
    setRefined(refineByParticipant(data));
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleRemove = () => {
    setCount(0);
    setRefined();
  };

  const renderAnalysis = lineCount > 5 && !!refined;
  if (renderAnalysis) {
    if (refined.miscRows.length > 0) {
      console.warn("Misc rows:", refined.miscRows);
      console.warn("Participants:", Object.keys(refined));
    }
  }

  return (
    <div>
      <Head>
        <title>Daily buys and sells by participant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Daily moves on Nasdaq Nord</h1>
        <ul>
          <li>
            Go to{" "}
            <a href="http://www.nasdaqomxnordic.com/shares">
              http://www.nasdaqomxnordic.com/shares
            </a>{" "}
            and find your ticker.
          </li>
          <li>
            Go to your tickers page, e.g.{" "}
            <a href="http://www.nasdaqomxnordic.com/shares/microsite?Instrument=HEX121161">
              TOKMAN
            </a>{" "}
            and scroll down to <b>Trades</b> and <b>Download CSV</b>
          </li>
        </ul>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          onRemoveFile={handleRemove}
          addRemoveButton
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </main>
      <div className="block">
        <p>Lines in document: {lineCount}</p>
        {renderAnalysis && (
          <p>Partial data rows: {refined.miscRows.length}, check console.</p>
        )}
        <p className="dataWarning">
          {lineCount > 0 && lineCount < 5 && "Not enough data, try again!"}
        </p>
      </div>
      {renderAnalysis && <MmtFlags data={fileData} />}
      {renderAnalysis && <Volumes refined={refined} />}
      {/*renderAnalysis && <ByParticipant refined={refined} />*/}
    </div>
  );
}
