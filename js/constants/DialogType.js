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

var qySources = ['ETF', 'INDICE', 'MUTUAL_FUNDS', 'TORONTO', 'TORONTO_VENTURE', 'MONTREAL', 'LONDON', 'PARIS', 'AMSTERDAM', 'COPPENHAGEN', 'OSLO', 'STOCKHOLM', 'SWISS', 'MILAN', 'MADRID', 'AUSTRALIAN', 'SHANGHAI', 'SHENZHEN', 'TAIWAN', 'HONG_KONG', 'SINGAPURE', 'BOMBEY'];
var QuandlYahoo = createTypeObject(qySources, 'QY');

var qeSources = ['CURRENCY_HISTORY', 'COMMODITY_PRICE', 'COMMODITY_TRADE', 'JODI_WORLD_GAS', 'JODI_WORLD_OIL', 'PETROLEUM_PRICES', 'EIA_COAL', 'GLOBAL_INDICATOR', 'WORLDBANK_PRICE', 'IMF_CROSSCOUNTRY', 'EU_COMMISSION', 'OECD', 'CPI_INFLATION', 'BIG_MAC', 'GDT', 'BLSI', 'ROGERS_INDICES', 'EURONEXT_STOCK', 'WIKI_STOCK', 'TOKIO_STOCK', 'STOCK_INDEXES', 'UNICORN_RESEARCH', 'CHINA_FINANCE_FUTURE', 'DCE_FUTURE', 'ZCE_FUTURE', 'SHANGHAI_FUTURE', 'LIFFE_FUTURE', 'ICE_FUTURE', 'WIKI_FUTURE', 'ZILLOW_REAL_ESTATE', 'FMAC'];
var Quandl = createTypeObject(qeSources, 'QE');

var qgSources = ['NASDAQ', 'NYSE', 'AMEX', 'ARCA', 'BRUSSELS', 'LISBON', 'TALLIN', 'RIGA', 'VILNIUS', 'SHENZHEN', 'SINGAPURE', 'KOREA', 'TAILAND', 'NEWZEALAND', 'SAO_PAOLO'];
var QuandlGoogle = createTypeObject(qgSources, 'QG');

exports.QuandlYahoo = QuandlYahoo;
exports.Quandl = Quandl;
exports.QuandlGoogle = QuandlGoogle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DialogType.js.map