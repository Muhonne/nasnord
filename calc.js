const R = require('ramda');

const data = require('./data')
console.log(data[0])
const byBuyer = R.groupBy(d => d.Buyer)(data)
console.log('BUYERS:', Object.keys(byBuyer))
const realBuyers = {
    JPAG: 'JP Morgan',
    MLEX: 'Bank of America',
    CITI: 'CitiGroup',
    GSAG: 'GoldMan Sachs',
    UBS: 'UBS?',  
    MSE: 'Morgan Stanley',
    BBI: 'Barclays Ireland',
    VFB: 'Virtu',
    CSV: 'Credit Suisse',
    XTXE: 'XTX Markets?',
    NON: 'Nordnet - Finnish broker?',
    DBL: 'Deutsche Bank',
    IEGG: 'Instinet Germany',
    POH: 'OP Corp',
    JTEU: 'Jump Trading Europe?',
    NRD: 'Nordea Bank',
    SIS: 'Susquehanna!!!!!!!!!!',
}

const bySeller = R.groupBy(d => d.Seller)(data)
console.log('SELLERS', Object.keys(bySeller))
const realSellers = {
    NON: 'Nordnet - Finnish broker?',
    MSE: 'Morgan Stanley',
    MLEX: 'Bank of America',
    BBI: 'Barclays Ireland',
    GSAG: 'GoldMan Sachs',
    JPAG: 'JP Morgan',
    SIS: 'Susquehanna!!!!!!!!!!',
    JTEU: 'Jump Trading Europe?',
    UBS: 'UBS?',  
    IEGG: 'Instinet Germany',
    CSV: 'Credit Suisse',
    XTXE: 'XTX Markets?',
    POH: 'OP Corp',
    NRD: 'Nordea Bank',
    ENS: 'Enskilda Banken',
    AAL: 'Ålandsbanken',
    DDB: 'Danske Bank',
    DBL: 'Deutsche Bank',
    SWB: 'Swedbank'   
}

console.log('BUYS')
for (const [key, values] of Object.entries(byBuyer)){
    console.log(realBuyers[key], values.reduce((acc, deal) => acc + deal.Volume, 0))
}
console.log('\n\n\nSELLS')
for (const [key, values] of Object.entries(bySeller)){
    console.log(realSellers[key], values.reduce((acc, deal) => acc + deal.Volume, 0))
}

