/**
 * This shit I figured out manually via http://www.nasdaqomxnordic.com/membership-list
 * There is an excel file below the dropdown filters
 */
const realBuyers = {
  JPAG: "JP Morgan",
  MLEX: "Bank of America",
  CITI: "CitiGroup",
  GSAG: "GoldMan Sachs",
  UBS: "UBS",
  MSE: "Morgan Stanley",
  BBI: "Barclays Ireland",
  VFB: "Virtu",
  CSV: "Credit Suisse",
  XTXE: "XTX Markets",
  NON: "Nordnet",
  DBL: "Deutsche Bank",
  IEGG: "Instinet Germany",
  POH: "OP Corp",
  JTEU: "Jump Trading Europe",
  NRD: "Nordea Bank",
  SIS: "Susquehanna",
};

const realSellers = {
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
};

export const realNames = { ...realBuyers, ...realSellers };

// function so always new instance
const participantDefault = () => ({
  buyVolume: 0,
  buyTotal: 0,
  sellVolume: 0,
  sellTotal: 0,
});

// We only care about buyer, seller, volume, price
const buyerIndex = 14;
const sellerIndex = 15;
const volumeIndex = 13;
const priceIndex = 12;

export const refineByParticipant = (data) => {
  let blob = {};
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
    }
  }
  return blob;
};
