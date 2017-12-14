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
    UnComtrade = _RouterAdapter2.default.UnComtrade,
    FaoStat = _RouterAdapter2.default.FaoStat,
    EuroStat = _RouterAdapter2.default.EuroStat,
    StatNorway = _RouterAdapter2.default.StatNorway,
    StatSweden = _RouterAdapter2.default.StatSweden,
    AlphaVantage = _RouterAdapter2.default.AlphaVantage,
    Barchart = _RouterAdapter2.default.Barchart,
    Iex = _RouterAdapter2.default.Iex,
    Insee = _RouterAdapter2.default.Insee;


var LoadImpl = {
  Quandl: (0, _loadItem2.default)((0, _extends3.default)({}, Quandl)),
  UnComtrade: (0, _loadItem2.default)((0, _extends3.default)({}, UnComtrade)),
  FaoStat: (0, _loadItem2.default)((0, _extends3.default)({}, FaoStat)),
  EuroStat: (0, _loadItem2.default)((0, _extends3.default)({}, EuroStat)),

  StatNorway: (0, _loadItem2.default)((0, _extends3.default)({}, StatNorway.Dataset)),
  StatNorway2: (0, _loadItem2.default)((0, _extends3.default)({}, StatNorway.Table)),

  StatSweden: (0, _loadItem2.default)((0, _extends3.default)({}, StatSweden.Table)),

  AlphaIndicator: (0, _loadItem2.default)((0, _extends3.default)({}, AlphaVantage.Indicator)),
  AlphaIntraday: (0, _loadItem2.default)((0, _extends3.default)({}, AlphaVantage.Intraday)),
  AlphaSector: (0, _loadItem2.default)((0, _extends3.default)({}, AlphaVantage.Sector)),

  Barchart: (0, _loadItem2.default)((0, _extends3.default)({
    fnFetch: _fnFetch.fetchJsonp
  }, Barchart)),

  Iex: (0, _loadItem2.default)((0, _extends3.default)({}, Iex)),
  Insee: (0, _loadItem2.default)((0, _extends3.default)({
    fnFetch: _fnFetch.fetchTxt
  }, Insee))
};

exports.default = LoadImpl;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadImpl.js.map