'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _QuandlApi = require('./QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _QuandlAdapter = require('./QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

var _EuroStat = require('./eurostat/EuroStat');

var _EuroStat2 = _interopRequireDefault(_EuroStat);

var _UnComtrade = require('./uncomtrade/UnComtrade');

var _UnComtrade2 = _interopRequireDefault(_UnComtrade);

var _FaoStat = require('./faostat/FaoStat');

var _FaoStat2 = _interopRequireDefault(_FaoStat);

var _StatNorway = require('./stat-norway/StatNorway');

var _StatNorway2 = _interopRequireDefault(_StatNorway);

var _StatSweden = require('./stat-sweden/StatSweden');

var _StatSweden2 = _interopRequireDefault(_StatSweden);

var _AlphaVantage = require('./alpha/AlphaVantage');

var _AlphaVantage2 = _interopRequireDefault(_AlphaVantage);

var _Barchart = require('./barchart/Barchart');

var _Barchart2 = _interopRequireDefault(_Barchart);

var _Iex = require('./iex/Iex');

var _Iex2 = _interopRequireDefault(_Iex);

var _Insee = require('./insee/Insee');

var _Insee2 = _interopRequireDefault(_Insee);

var _Bea = require('./bea/Bea');

var _Bea2 = _interopRequireDefault(_Bea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterAdapter = {
  Quandl: {
    api: _QuandlApi2.default,
    adapter: _QuandlAdapter2.default
  },

  EuroStat: _EuroStat2.default,
  UnComtrade: _UnComtrade2.default,
  FaoStat: _FaoStat2.default,
  StatNorway: _StatNorway2.default,
  StatSweden: _StatSweden2.default,
  AlphaVantage: _AlphaVantage2.default,
  Barchart: _Barchart2.default,
  Iex: _Iex2.default,
  Insee: _Insee2.default,
  Bea: _Bea2.default
};

exports.default = RouterAdapter;
//# sourceMappingURL=RouterAdapter.js.map