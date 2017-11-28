'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fnFetch = require('../../utils/fnFetch');

var _loadItem = require('./loadItem');

var _loadItem2 = _interopRequireDefault(_loadItem);

var _Api = require('../../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _EuroStatAdapter = require('../../adapters/eurostat/EuroStatAdapter');

var _EuroStatAdapter2 = _interopRequireDefault(_EuroStatAdapter);

var _StatNorwayAdapter = require('../../adapters/stat-norway/StatNorwayAdapter');

var _StatNorwayAdapter2 = _interopRequireDefault(_StatNorwayAdapter);

var _InseeAdapter = require('../../adapters/insee/InseeAdapter');

var _InseeAdapter2 = _interopRequireDefault(_InseeAdapter);

var _Adapter = require('../../adapters/alpha/Adapter');

var _Adapter2 = _interopRequireDefault(_Adapter);

var _BarchartAdapter = require('../../adapters/barchart/BarchartAdapter');

var _BarchartAdapter2 = _interopRequireDefault(_BarchartAdapter);

var _IexAdapter = require('../../adapters/iex/IexAdapter');

var _IexAdapter2 = _interopRequireDefault(_IexAdapter);

var _QuandlAdapter = require('../../adapters/QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

var _UnComtradeAdapter = require('../../adapters/uncomtrade/UnComtradeAdapter');

var _UnComtradeAdapter2 = _interopRequireDefault(_UnComtradeAdapter);

var _FaoStatAdapter = require('../../adapters/faostat/FaoStatAdapter');

var _FaoStatAdapter2 = _interopRequireDefault(_FaoStatAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quandl = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.Quandl,
  adapter: _QuandlAdapter2.default
});

var UnComtrade = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.UnComtrade,
  adapter: _UnComtradeAdapter2.default
});

var FaoStat = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.FaoStat,
  adapter: _FaoStatAdapter2.default
});

var EuroStat = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.EuroStat,
  adapter: _EuroStatAdapter2.default
});

var StatNorway = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.StatNorway,
  adapter: _StatNorwayAdapter2.default
});
var StatNorway2 = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.StatNorway2,
  optionFetch: _Api2.default.StatNorway2.crOptionFetch,
  adapter: _StatNorwayAdapter2.default
});

var AlphaIndicator = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.Alpha,
  adapter: _Adapter2.default.Indicator
});

var AlphaIntraday = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.Alpha,
  adapter: _Adapter2.default.Intraday
});

var AlphaSector = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.Alpha,
  adapter: _Adapter2.default.Sector
});

var Barchart = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJsonp,
  optionFetch: {
    jsonpCallbackFunction: 'BarchartAPIcallback'
  },
  api: _Api2.default.Barchart,
  adapter: _BarchartAdapter2.default
});

var Iex = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchJson,
  api: _Api2.default.Iex,
  adapter: _IexAdapter2.default
});

var Insee = (0, _loadItem2.default)({
  fnFetch: _fnFetch.fetchTxt,
  api: _Api2.default.Insee,
  adapter: _InseeAdapter2.default
});

exports.default = {
  Quandl: Quandl,
  EuroStat: EuroStat,
  StatNorway: StatNorway,
  StatNorway2: StatNorway2,
  Insee: Insee,

  AlphaIndicator: AlphaIndicator,
  AlphaIntraday: AlphaIntraday,
  AlphaSector: AlphaSector,

  Barchart: Barchart,

  Iex: Iex,

  UnComtrade: UnComtrade,
  FaoStat: FaoStat
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadImpl.js.map