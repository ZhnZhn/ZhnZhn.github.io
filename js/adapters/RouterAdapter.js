"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _EuroStat = _interopRequireDefault(require("./eurostat/EuroStat"));

var _UnComtrade = _interopRequireDefault(require("./uncomtrade/UnComtrade"));

var _FaoStat = _interopRequireDefault(require("./faostat/FaoStat"));

var _WorldBank = _interopRequireDefault(require("./world-bank/WorldBank"));

var _Insee = _interopRequireDefault(require("./insee/Insee"));

var _StatUk = _interopRequireDefault(require("./stat-uk/StatUk"));

var _StatNorway = _interopRequireDefault(require("./stat-norway/StatNorway"));

var _StatSweden = _interopRequireDefault(require("./stat-sweden/StatSweden"));

var _StatFinland = _interopRequireDefault(require("./stat-finland/StatFinland"));

var _StatDenmark = _interopRequireDefault(require("./stat-denmark/StatDenmark"));

var _StatIreland = _interopRequireDefault(require("./stat-ireland/StatIreland"));

var _AlphaVantage = _interopRequireDefault(require("./alpha/AlphaVantage"));

var _Iex = _interopRequireDefault(require("./iex/Iex"));

var _Fmp = _interopRequireDefault(require("./fmp/Fmp"));

var _Tw = _interopRequireDefault(require("./twelve/Tw"));

var _Bea = _interopRequireDefault(require("./bea/Bea"));

var _Bls = _interopRequireDefault(require("./bls/Bls"));

var _Eia = _interopRequireDefault(require("./eia/Eia"));

var _Intrinio = _interopRequireDefault(require("./intrinio/Intrinio"));

var _Quandl = _interopRequireDefault(require("./quandl/Quandl"));

var _DbNomics = _interopRequireDefault(require("./db-nomics/DbNomics"));

var _Ember = _interopRequireDefault(require("./ember/Ember"));

var _Irena = _interopRequireDefault(require("./irena/Irena"));

var _Crc = _interopRequireDefault(require("./crypto-compare/Crc"));

var _Cg = _interopRequireDefault(require("./coin-gecko/Cg"));

var _Cm = _interopRequireDefault(require("./coin-metrics/Cm"));

var _Cp = _interopRequireDefault(require("./coin-paprika/Cp"));

var _Cl = _interopRequireDefault(require("./coin-lore/Cl"));

var _Bn = _interopRequireDefault(require("./binance/Bn"));

var _Bf = _interopRequireDefault(require("./bitfinex/Bf"));

var _Bt = _interopRequireDefault(require("./bitstamp/Bt"));

const RouterAdapter = {
  Quandl: _Quandl.default,
  DbNomics: _DbNomics.default,
  Ember: _Ember.default,
  Irena: _Irena.default,
  EuroStat: _EuroStat.default,
  UnComtrade: _UnComtrade.default,
  FaoStat: _FaoStat.default,
  WorldBank: _WorldBank.default,
  Insee: _Insee.default,
  StatUk: _StatUk.default,
  ..._StatNorway.default,
  StatSweden: _StatSweden.default,
  StatFinland: _StatFinland.default,
  StatDenmark: _StatDenmark.default,
  StatIreland: _StatIreland.default,
  AlphaVantage: _AlphaVantage.default,
  Iex: _Iex.default,
  Fmp: _Fmp.default,
  Tw: _Tw.default,
  Bea: _Bea.default,
  Bls: _Bls.default,
  Eia: _Eia.default,
  Intrinio: _Intrinio.default,
  Crc: _Crc.default,
  Cg: _Cg.default,
  Cm: _Cm.default,
  Cp: _Cp.default,
  Cl: _Cl.default,
  Bn: _Bn.default,
  Bf: _Bf.default,
  Bt: _Bt.default
};
var _default = RouterAdapter;
exports.default = _default;
//# sourceMappingURL=RouterAdapter.js.map