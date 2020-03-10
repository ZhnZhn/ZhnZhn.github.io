"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _EuroStat = _interopRequireDefault(require("./eurostat/EuroStat"));

var _UnComtrade = _interopRequireDefault(require("./uncomtrade/UnComtrade"));

var _FaoStat = _interopRequireDefault(require("./faostat/FaoStat"));

var _WorldBank = _interopRequireDefault(require("./world-bank/WorldBank"));

var _StatNorway = _interopRequireDefault(require("./stat-norway/StatNorway"));

var _StatSweden = _interopRequireDefault(require("./stat-sweden/StatSweden"));

var _StatFinland = _interopRequireDefault(require("./stat-finland/StatFinland"));

var _AlphaVantage = _interopRequireDefault(require("./alpha/AlphaVantage"));

var _Barchart = _interopRequireDefault(require("./barchart/Barchart"));

var _Iex = _interopRequireDefault(require("./iex/Iex"));

var _Wtd = _interopRequireDefault(require("./wtd/Wtd"));

var _Fmp = _interopRequireDefault(require("./fmp/Fmp"));

var _Insee = _interopRequireDefault(require("./insee/Insee"));

var _Bea = _interopRequireDefault(require("./bea/Bea"));

var _Bls = _interopRequireDefault(require("./bls/Bls"));

var _Eia = _interopRequireDefault(require("./eia/Eia"));

var _Intrinio = _interopRequireDefault(require("./intrinio/Intrinio"));

var _Quandl = _interopRequireDefault(require("./quandl/Quandl"));

var _DbNomics = _interopRequireDefault(require("./db-nomics/DbNomics"));

var _Crc = _interopRequireDefault(require("./crypto-compare/Crc"));

//import Cmc from './coin-market-cap/Cmc'
var RouterAdapter = {
  Quandl: _Quandl["default"],
  DbNomics: _DbNomics["default"],
  EuroStat: _EuroStat["default"],
  UnComtrade: _UnComtrade["default"],
  FaoStat: _FaoStat["default"],
  WorldBank: _WorldBank["default"],
  StatNorway: _StatNorway["default"],
  StatSweden: _StatSweden["default"],
  StatFinland: _StatFinland["default"],
  AlphaVantage: _AlphaVantage["default"],
  Barchart: _Barchart["default"],
  Iex: _Iex["default"],
  Wtd: _Wtd["default"],
  Fmp: _Fmp["default"],
  Insee: _Insee["default"],
  Bea: _Bea["default"],
  Bls: _Bls["default"],
  Eia: _Eia["default"],
  Intrinio: _Intrinio["default"],
  Crc: _Crc["default"] //Cmc

};
var _default = RouterAdapter;
exports["default"] = _default;
//# sourceMappingURL=RouterAdapter.js.map