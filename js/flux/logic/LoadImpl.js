"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fnFetch = require("../../utils/fnFetch");

var _RouterAdapter = _interopRequireDefault(require("../../adapters/RouterAdapter"));

var _loadItem = _interopRequireDefault(require("./loadItem"));

var Quandl = _RouterAdapter["default"].Quandl,
    DbNomics = _RouterAdapter["default"].DbNomics,
    UnComtrade = _RouterAdapter["default"].UnComtrade,
    FaoStat = _RouterAdapter["default"].FaoStat,
    WorldBank = _RouterAdapter["default"].WorldBank,
    EuroStat = _RouterAdapter["default"].EuroStat,
    StatNorway = _RouterAdapter["default"].StatNorway,
    StatSweden = _RouterAdapter["default"].StatSweden,
    StatFinland = _RouterAdapter["default"].StatFinland,
    Insee = _RouterAdapter["default"].Insee,
    AlphaVantage = _RouterAdapter["default"].AlphaVantage,
    Barchart = _RouterAdapter["default"].Barchart,
    Intrinio = _RouterAdapter["default"].Intrinio,
    Crc = _RouterAdapter["default"].Crc,
    Cmc = _RouterAdapter["default"].Cmc,
    Iex = _RouterAdapter["default"].Iex,
    Wtd = _RouterAdapter["default"].Wtd,
    Fmp = _RouterAdapter["default"].Fmp,
    Bea = _RouterAdapter["default"].Bea,
    Bls = _RouterAdapter["default"].Bls,
    Eia = _RouterAdapter["default"].Eia;
var LoadImpl = {
  Quandl: (0, _loadItem["default"])((0, _extends2["default"])({}, Quandl)),
  DbNomics: (0, _loadItem["default"])((0, _extends2["default"])({}, DbNomics)),
  UnComtrade: (0, _loadItem["default"])((0, _extends2["default"])({}, UnComtrade)),
  FaoStat: (0, _loadItem["default"])((0, _extends2["default"])({}, FaoStat)),
  WorldBank: (0, _loadItem["default"])((0, _extends2["default"])({}, WorldBank)),
  EuroStat: (0, _loadItem["default"])((0, _extends2["default"])({}, EuroStat)),
  StatNorway: (0, _loadItem["default"])((0, _extends2["default"])({}, StatNorway.Dataset)),
  StatNorway2: (0, _loadItem["default"])((0, _extends2["default"])({}, StatNorway.Table)),
  StatSweden: (0, _loadItem["default"])((0, _extends2["default"])({}, StatSweden.Table)),
  StatFinland: (0, _loadItem["default"])((0, _extends2["default"])({}, StatFinland.Table)),
  AlphaIndicator: (0, _loadItem["default"])((0, _extends2["default"])({}, AlphaVantage.Indicator)),
  AlphaIntraday: (0, _loadItem["default"])((0, _extends2["default"])({}, AlphaVantage.Intraday)),
  AlphaSector: (0, _loadItem["default"])((0, _extends2["default"])({}, AlphaVantage.Sector)),
  Barchart: (0, _loadItem["default"])((0, _extends2["default"])({
    fnFetch: _fnFetch.fetchJsonp
  }, Barchart)),
  Iex: (0, _loadItem["default"])((0, _extends2["default"])({}, Iex)),
  Wtd: (0, _loadItem["default"])((0, _extends2["default"])({}, Wtd)),
  Fmp: (0, _loadItem["default"])((0, _extends2["default"])({}, Fmp)),
  Intrinio: (0, _loadItem["default"])((0, _extends2["default"])({}, Intrinio)),
  Crc: (0, _loadItem["default"])((0, _extends2["default"])({}, Crc)),
  Cmc: (0, _loadItem["default"])((0, _extends2["default"])({}, Cmc)),
  Insee: (0, _loadItem["default"])((0, _extends2["default"])({
    fnFetch: _fnFetch.fetchTxt
  }, Insee)),
  Bea: (0, _loadItem["default"])((0, _extends2["default"])({}, Bea)),
  Bls: (0, _loadItem["default"])((0, _extends2["default"])({}, Bls)),
  Eia: (0, _loadItem["default"])((0, _extends2["default"])({}, Eia))
};
var _default = LoadImpl;
exports["default"] = _default;
//# sourceMappingURL=LoadImpl.js.map