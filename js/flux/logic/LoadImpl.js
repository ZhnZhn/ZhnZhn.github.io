'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _fnFetch = require('../../utils/fnFetch');

var _RouterAdapter = require('../../adapters/RouterAdapter');

var _RouterAdapter2 = _interopRequireDefault(_RouterAdapter);

var _loadItem = require('./loadItem');

var _loadItem2 = _interopRequireDefault(_loadItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quandl = _RouterAdapter2.default.Quandl,
    DbNomics = _RouterAdapter2.default.DbNomics,
    UnComtrade = _RouterAdapter2.default.UnComtrade,
    FaoStat = _RouterAdapter2.default.FaoStat,
    WorldBank = _RouterAdapter2.default.WorldBank,
    EuroStat = _RouterAdapter2.default.EuroStat,
    StatNorway = _RouterAdapter2.default.StatNorway,
    StatSweden = _RouterAdapter2.default.StatSweden,
    StatFinland = _RouterAdapter2.default.StatFinland,
    AlphaVantage = _RouterAdapter2.default.AlphaVantage,
    Barchart = _RouterAdapter2.default.Barchart,
    Intrinio = _RouterAdapter2.default.Intrinio,
    Crc = _RouterAdapter2.default.Crc,
    Cmc = _RouterAdapter2.default.Cmc,
    Iex = _RouterAdapter2.default.Iex,
    Insee = _RouterAdapter2.default.Insee,
    Bea = _RouterAdapter2.default.Bea,
    Bls = _RouterAdapter2.default.Bls,
    Eia = _RouterAdapter2.default.Eia;


var LoadImpl = {
  Quandl: (0, _loadItem2.default)((0, _extends3.default)({}, Quandl)),
  DbNomics: (0, _loadItem2.default)((0, _extends3.default)({}, DbNomics)),
  UnComtrade: (0, _loadItem2.default)((0, _extends3.default)({}, UnComtrade)),
  FaoStat: (0, _loadItem2.default)((0, _extends3.default)({}, FaoStat)),
  WorldBank: (0, _loadItem2.default)((0, _extends3.default)({}, WorldBank)),
  EuroStat: (0, _loadItem2.default)((0, _extends3.default)({}, EuroStat)),

  StatNorway: (0, _loadItem2.default)((0, _extends3.default)({}, StatNorway.Dataset)),
  StatNorway2: (0, _loadItem2.default)((0, _extends3.default)({}, StatNorway.Table)),

  StatSweden: (0, _loadItem2.default)((0, _extends3.default)({}, StatSweden.Table)),
  StatFinland: (0, _loadItem2.default)((0, _extends3.default)({}, StatFinland.Table)),

  AlphaIndicator: (0, _loadItem2.default)((0, _extends3.default)({}, AlphaVantage.Indicator)),
  AlphaIntraday: (0, _loadItem2.default)((0, _extends3.default)({}, AlphaVantage.Intraday)),
  AlphaSector: (0, _loadItem2.default)((0, _extends3.default)({}, AlphaVantage.Sector)),

  Barchart: (0, _loadItem2.default)((0, _extends3.default)({
    fnFetch: _fnFetch.fetchJsonp
  }, Barchart)),
  Iex: (0, _loadItem2.default)((0, _extends3.default)({}, Iex)),
  Intrinio: (0, _loadItem2.default)((0, _extends3.default)({}, Intrinio)),

  Crc: (0, _loadItem2.default)((0, _extends3.default)({}, Crc)),
  Cmc: (0, _loadItem2.default)((0, _extends3.default)({}, Cmc)),

  Insee: (0, _loadItem2.default)((0, _extends3.default)({
    fnFetch: _fnFetch.fetchTxt
  }, Insee)),

  Bea: (0, _loadItem2.default)((0, _extends3.default)({}, Bea)),
  Bls: (0, _loadItem2.default)((0, _extends3.default)({}, Bls)),
  Eia: (0, _loadItem2.default)((0, _extends3.default)({}, Eia))
};

exports.default = LoadImpl;
//# sourceMappingURL=LoadImpl.js.map