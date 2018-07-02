
const createTypeObject = function(arr, id){
  const obj = Object.create(null);
  for (let i=0, max=arr.length; i<max; i++){
    obj[arr[i]] = id + '_' + arr[i];
  }
  return obj;
}

const qeSources = [
  'CURRENCY_HISTORY',
  'COMMODITY_PRICE',
  'WIKI_COMMODITY_PRICE',
  'LME',
  'COMMODITY_TRADE',
  'JODI_WORLD_GAS',
  'JODI_WORLD_OIL',
  'BP',
  'PETROLEUM_PRICES',
  'GLOBAL_INDICATOR',
  'WORLDBANK_PRICE',
  'IMF_CROSSCOUNTRY',
  'EU_COMMISSION',
  'OECD',

  'BANK_CANADA',
  'BANK_SWISS',

  'OECD_CPI',
  'RATE_INFLATION',
  'BIG_MAC',  
  'BLSI',
  'ROGERS_INDICES',
  'BALTIC_INDICES',

  'CHINA_FINANCE_FUTURE',
  'DCE_FUTURE',
  'ZCE_FUTURE',
  'SHANGHAI_FUTURE',
  'LIFFE_FUTURE',
  'ICE_FUTURE',
  'WIKI_FUTURE'
];
const Quandl = createTypeObject(qeSources, 'QE');

export { Quandl }
