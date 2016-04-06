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

var qeSources = ['CURRENCY_HISTORY', 'COMMODITY_PRICE', 'WORLDBANK_PRICE', 'WIKI_STOCK', 'TOKIO_STOCK', 'CHINA_DCE_FUTURE'];
var Quandl = createTypeObject(qeSources, 'QE');

var qgSources = ['NASDAQ', 'NYSE', 'AMEX', 'ARCA', 'BRUSSELS', 'LISBON', 'TALLIN', 'RIGA', 'VILNIUS', 'SHENZHEN', 'SINGAPURE', 'KOREA', 'NEWZEALAND', 'SAO_PAOLO'];
var QuandlGoogle = createTypeObject(qgSources, 'QG');

exports.QuandlYahoo = QuandlYahoo;
exports.Quandl = Quandl;
exports.QuandlGoogle = QuandlGoogle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DialogType.js.map