import Head from "next/head";
import { useState } from "react";
import { CSVReader } from "react-papaparse";
import ByParticipant from "../ByParticipant";

import { refineByParticipant } from "../utils";
import Volumes from "../Volumes";

export default function Home() {
  const [lineCount, setCount] = useState(0);
  const [refined, setRefined] = useState();

  const handleOnDrop = (data) => {
    setCount(data.length);
    console.log("Month:", data[0]);
    console.log("Headers:", data[1]);
    console.log("Row:", data[2]);
    setRefined(refineByParticipant(data));
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  return (
    <div>
      <Head>
        <title>Daily buys and sells by participant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Daily moves on Nasdaq Nord</h1>
        <ul>
          <li>Go to <a href="http://www.nasdaqomxnordic.com/shares">http://www.nasdaqomxnordic.com/shares</a> and find your ticker.</li>
          <li>Go to your tickers page, e.g. <a href="http://www.nasdaqomxnordic.com/shares/microsite?Instrument=HEX121161">TOKMAN</a> and scroll down to <b>Trades</b> and <b>Download CSV</b></li>
        </ul>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </main>
      <div className="block">
        <p>Lines in document: {lineCount}</p>
      </div>
      {!!refined && <Volumes refined={refined}/>}
      {!!refined && <ByParticipant refined={refined} />}
    </div>
  );
}
