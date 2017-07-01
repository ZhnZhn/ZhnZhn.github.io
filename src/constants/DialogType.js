


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
  'COMMODITY_TRADE',
  'JODI_WORLD_GAS',
  'JODI_WORLD_OIL',
  'BP',
  'PETROLEUM_PRICES',
  'EIA_COAL',
  'GLOBAL_INDICATOR',
  'WORLDBANK_PRICE',
  'IMF_CROSSCOUNTRY',
  'EU_COMMISSION',
  'OECD',
  'USCENSUS_TRADE',

  'OECD_CPI',
  'RATE_INFLATION',
  'BIG_MAC',
  'GDT',
  'BLSI',
  'ROGERS_INDICES',
  'BALTIC_INDICES',

  'EURONEXT_STOCK',
  'WIKI_STOCK',
  'BARCHART_STOCK',
  'ALPHA_INDICATOR',
  'TOKIO_STOCK',
  'NIKKEI',
  'UNICORN_RESEARCH',

  'CHINA_FINANCE_FUTURE',
  'DCE_FUTURE',
  'ZCE_FUTURE',
  'SHANGHAI_FUTURE',
  'LIFFE_FUTURE',
  'ICE_FUTURE',
  'WIKI_FUTURE',

  'ZILLOW_REAL_ESTATE',
  'FMAC'
];
const Quandl = createTypeObject(qeSources, 'QE');

export { Quandl }
