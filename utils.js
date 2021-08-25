/**
 * This shit I figured out manually via http://www.nasdaqomxnordic.com/membership-list
 * There is an excel file below the dropdown filters
 */
export const realNames = {
  CITI: "CitiGroup",
  VFB: "Virtu",
  NON: "Nordnet",
  MSE: "Morgan Stanley",
  MLEX: "Bank of America",
  BBI: "Barclays Ireland",
  GSAG: "GoldMan Sachs",
  JPAG: "JP Morgan",
  SIS: "Susquehanna",
  JTEU: "Jump Trading Europe",
  UBS: "UBS",
  IEGG: "Instinet Germany",
  CSV: "Credit Suisse",
  XTXE: "XTX Markets",
  POH: "OP Corp",
  NRD: "Nordea Bank",
  ENS: "Enskilda Banken",
  AAL: "Ålandsbanken",
  DDB: "Danske Bank",
  DBL: "Deutsche Bank",
  SWB: "Swedbank",
  AVA: "Avanza",
  CAR: "Carnegie Investment",
  SHB: "Svenska Handels",
  LFB: "Länsförsäkringar Bank AB",
  AIV: "Aktieinvest",
  SBN: "SkandiaBanken",
  SSWM: "SSW Market Making",
  RBCG: "RCB Capital Markets",
  PAS: "Pareto Securities",
  MGF: "Mangold Foldcomission",
  SYD: "Sydbank",
  ABC: "Sundal Collier",
  TMB: "IBKR",
};

// function so always new instance
const participantDefault = () => ({
  buyVolume: 0,
  buyTotal: 0,
  sellVolume: 0,
  sellTotal: 0,
});

// what we care about
const buyerIndex = 14;
const sellerIndex = 15;
const volumeIndex = 13;
const priceIndex = 12;
const mmtIndex = 10;

export const refineByParticipant = (data) => {
  let blob = {
    miscRows: [],
  };
  for (let index = 2; index < data.length; index++) {
    // omit ..2 header lines
    const row = data[index];
    const buyer = row.data[buyerIndex];
    const seller = row.data[sellerIndex];
    const volume = Number.parseInt(row.data[volumeIndex]);
    const price = Number.parseInt(row.data[priceIndex]); // close enough, we want big picture
    if (buyer && seller && volume && price) {
      if (!blob[buyer]) blob[buyer] = participantDefault();
      if (!blob[seller]) blob[seller] = participantDefault();

      // reduce data
      blob[buyer].buyVolume = volume + blob[buyer].buyVolume;
      blob[buyer].buyTotal = volume * price + blob[buyer].buyTotal;
      blob[seller].sellVolume = volume + blob[seller].sellVolume;
      blob[seller].sellTotal = volume * price + blob[seller].sellTotal;
    } else {
      blob.miscRows.push(row);
    }
  }
  return blob;
};

export const mmtCalc = (data) => {
  let blob = {};
  for (let index = 2; index < data.length; index++) {
    // omit ..2 header lines
    const row = data[index];
    const mmt = row.data[mmtIndex];
    if (!blob[mmt]) blob[mmt] = 0;
    blob[mmt] += 1;
  }
  console.log("mmtblob", blob);
  return blob;
};

/**
 * as per 9 appendix A in https://www.nasdaq.com/docs/Nasdaq-Nordic-Equity-Last-Sale-1.2.7.pdf
 */
const mmtData = {
  0: {
    1: "Central limit order book",
    2: "Quote driven market",
    3: "Dark order book",
    4: "Off book",
    5: "Periodic auction",
    6: "Request for quotes",
    7: "Any other?",
  },
  1: {
    1: "Undefined auction",
    O: "Scheduled opening auction",
    K: "Scheduled closing auction",
    I: "Scheduled Intraday auction",
    U: "Unscheduled auction",
    2: "Continuous trading",
    3: "At market close trading",
    4: "Out of Main session trading",
    5: "Trade reporting ON exchange",
    6: "Trade reporting OFF exchange",
    7: "Trade reporting Systematic Internaliser",
  },
  2: {
    D: "Dark trade",
    R: "Trade that has Received Price Improvement",
    Z: "Package trade",
    Y: "Exchange fro Physicals Trade",
  },
  3: {
    N: "Negotiated trade",
    1: "Negotiated trade in Liquie Financial Instruments",
    2: "Negotiated Trade in Illiquid Financial Instruments",
    3: "Negotiated	Trade	Subject	to	Conditions	Other	Than	The	Current	Market	Price",
    4: "Pre-Trade	Transparency	Waiver	for	Illiquid Instrument	on	an	SI",
    5: "Pre-Trade	Transparency	Waiver	for	Above	Standard Market	Size	on	an	SI",
    6: "Pre-Trade	Transparency	Waivers	of	ILQD	and	SIZE",
  },
  4: {
    X: "Agency cross trade",
    C: "Trade cancellation",
    A: "Trade amendment",
  },
  5: {
    C: "Trade cancellation",
    A: "Trade amendment",
  },
  6: {
    B: "Benchmark trade",
    S: "Reference price trade",
  },
  7: {
    E: "Special dividend trade",
  },
  8: {
    M: "Off book non-automated",
    Q: "Ogg book automated",
  },
  9: {
    P: "Plain vanilla trade",
    T: "Non-Price forming trade",
    J: "Trade not contributing to the Price Discovery Process",
    N: "Price is currently Not available but Pending",
  },
  10: {
    H: "Algorithmic trade",
  },
  11: {
    1: "Non-Immediate publication",
    2: "Non-Immediate	Publication:	Deferral	for	'Large	in Scale'",
    3: "Non-Immediate	Publication:	Deferral	for	'Illiquid Instrument'",
    4: "Non-Immediate	Publication:	Deferral	for	'Size Specific'",
    5: "Non-Immediate	Publication:	Deferrals	of	'ILQD'	and	 'SIZE'",
    6: "Non-Immediate	Publication:	Deferrals	of	“ILQD”	and “LRGS”",
  },
  12: {
    1: "Limited	Details	Trade",
    2: "Daily	Aggregated	Trade",
    3: "Volume	Omission	Trade",
    4: "Four	Weeks	Aggregation	Trade",
    5: "Indefinite	Aggregation	Trade",
    6: "Volume	Omission	Trade,	Eligible	for	Subsequent Enrichment	in	Aggregated	Form",
    7: "Full	Details	of	Earlier	'Limited	Details	Trade	(LMTF)'",
    8: "Full	Details	of	Earlier 'Daily	Aggregated	Trade (DATF)'",
    9: "Full	Details	of	Earlier	'Volume	Omission	Trade	(VOLO)'",
    V: "Full	Details	of	Earlier	'Four	Weeks	Aggregation	Trade	(FWAF)'",
    W: "Full	Details	in	Aggregated	Form	of	Earlier	'Volume	Omission	Trade,	Eligible	for	Subsequent	Enrichment in	Aggregated	Form	(VOLW)'",
  },
  13: {
    1: "Duplicative	Trade	Report	(reported	to	more	than	one	APA)",
  },
};
export const mmtDecode = (flag) => {
  const pieces = flag.split("")
  const textual = []
  pieces.forEach((p,i) => {
    const t = mmtData[i][p]
    if(t) textual.push(t)
  })
  return textual
};
