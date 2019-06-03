'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EuroStat = require('./eurostat/EuroStat');

var _EuroStat2 = _interopRequireDefault(_EuroStat);

var _UnComtrade = require('./uncomtrade/UnComtrade');

var _UnComtrade2 = _interopRequireDefault(_UnComtrade);

var _FaoStat = require('./faostat/FaoStat');

var _FaoStat2 = _interopRequireDefault(_FaoStat);

var _WorldBank = require('./world-bank/WorldBank');

var _WorldBank2 = _interopRequireDefault(_WorldBank);

var _StatNorway = require('./stat-norway/StatNorway');

var _StatNorway2 = _interopRequireDefault(_StatNorway);

var _StatSweden = require('./stat-sweden/StatSweden');

var _StatSweden2 = _interopRequireDefault(_StatSweden);

var _StatFinland = require('./stat-finland/StatFinland');

var _StatFinland2 = _interopRequireDefault(_StatFinland);

var _AlphaVantage = require('./alpha/AlphaVantage');

var _AlphaVantage2 = _interopRequireDefault(_AlphaVantage);

var _Barchart = require('./barchart/Barchart');

var _Barchart2 = _interopRequireDefault(_Barchart);

var _Iex = require('./iex/Iex');

var _Iex2 = _interopRequireDefault(_Iex);

var _Fmp = require('./fmp/Fmp');

var _Fmp2 = _interopRequireDefault(_Fmp);

var _Insee = require('./insee/Insee');

var _Insee2 = _interopRequireDefault(_Insee);

var _Bea = require('./bea/Bea');

var _Bea2 = _interopRequireDefault(_Bea);

var _Bls = require('./bls/Bls');

var _Bls2 = _interopRequireDefault(_Bls);

var _Eia = require('./eia/Eia');

var _Eia2 = _interopRequireDefault(_Eia);

var _Intrinio = require('./intrinio/Intrinio');

var _Intrinio2 = _interopRequireDefault(_Intrinio);

var _Quandl = require('./quandl/Quandl');

var _Quandl2 = _interopRequireDefault(_Quandl);

var _DbNomics = require('./db-nomics/DbNomics');

var _DbNomics2 = _interopRequireDefault(_DbNomics);

var _Crc = require('./crypto-compare/Crc');

var _Crc2 = _interopRequireDefault(_Crc);

var _Cmc = require('./coin-market-cap/Cmc');

var _Cmc2 = _interopRequireDefault(_Cmc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterAdapter = {
  Quandl: _Quandl2.default,
  DbNomics: _DbNomics2.default,
  EuroStat: _EuroStat2.default,
  UnComtrade: _UnComtrade2.default,
  FaoStat: _FaoStat2.default,
  WorldBank: _WorldBank2.default,
  StatNorway: _StatNorway2.default,
  StatSweden: _StatSweden2.default,
  StatFinland: _StatFinland2.default,
  AlphaVantage: _AlphaVantage2.default,
  Barchart: _Barchart2.default,
  Iex: _Iex2.default,
  Fmp: _Fmp2.default,
  Insee: _Insee2.default,
  Bea: _Bea2.default,
  Bls: _Bls2.default,
  Eia: _Eia2.default,
  Intrinio: _Intrinio2.default,
  Crc: _Crc2.default,
  Cmc: _Cmc2.default
};

exports.default = RouterAdapter;
//# sourceMappingURL=RouterAdapter.js.map