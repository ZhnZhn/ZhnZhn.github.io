'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createTypeObject = function createTypeObject(arr, id) {
  var obj = Object.create(null);
  for (var i = 0, max = arr.length; i < max; i++) {
    obj[arr[i]] = id + '_' + arr[i];
  }
  return obj;
};

var qeSources = ['CURRENCY_HISTORY', 'COMMODITY_PRICE', 'WIKI_COMMODITY_PRICE', 'LME', 'COMMODITY_TRADE', 'JODI_WORLD_GAS', 'JODI_WORLD_OIL', 'BP', 'PETROLEUM_PRICES', 'EIA_COAL', 'GLOBAL_INDICATOR', 'WORLDBANK_PRICE', 'IMF_CROSSCOUNTRY', 'EU_COMMISSION', 'OECD', 'USCENSUS_TRADE', 'OECD_CPI', 'RATE_INFLATION', 'BIG_MAC', 'GDT', 'BLSI', 'ROGERS_INDICES', 'BALTIC_INDICES', 'CHINA_FINANCE_FUTURE', 'DCE_FUTURE', 'ZCE_FUTURE', 'SHANGHAI_FUTURE', 'LIFFE_FUTURE', 'ICE_FUTURE', 'WIKI_FUTURE', 'ZILLOW_REAL_ESTATE', 'ZILLOW_REAL_ESTATE_2', 'FMAC'];
var Quandl = createTypeObject(qeSources, 'QE');

exports.Quandl = Quandl;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DialogType.js.map