'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fn = require('../../utils/fn');

var _fnJsonp = require('../../utils/fnJsonp');

var _fnFetchTxt = require('../../utils/fnFetchTxt');

var _fnFetchTxt2 = _interopRequireDefault(_fnFetchTxt);

var _loadItem = require('./loadItem');

var _loadItem2 = _interopRequireDefault(_loadItem);

var _Api = require('../../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _EuroStatAdapter = require('../../adapters/eurostat/EuroStatAdapter');

var _EuroStatAdapter2 = _interopRequireDefault(_EuroStatAdapter);

var _InseeAdapter = require('../../adapters/insee/InseeAdapter');

var _InseeAdapter2 = _interopRequireDefault(_InseeAdapter);

var _Adapter = require('../../adapters/alpha/Adapter');

var _Adapter2 = _interopRequireDefault(_Adapter);

var _BarchartAdapter = require('../../adapters/barchart/BarchartAdapter');

var _BarchartAdapter2 = _interopRequireDefault(_BarchartAdapter);

var _QuandlAdapter = require('../../adapters/QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quandl = (0, _loadItem2.default)({
  fnFetch: _fn.fnFetch,
  api: _Api2.default.Quandl,
  adapter: _QuandlAdapter2.default
});

var EuroStat = (0, _loadItem2.default)({
  fnFetch: _fn.fnFetch,
  api: _Api2.default.EuroStat,
  adapter: _EuroStatAdapter2.default
});

var AlphaIndicator = (0, _loadItem2.default)({
  fnFetch: _fn.fnFetch,
  api: _Api2.default.Alpha,
  adapter: _Adapter2.default.Indicator
});

var AlphaIntraday = (0, _loadItem2.default)({
  fnFetch: _fn.fnFetch,
  api: _Api2.default.Alpha,
  adapter: _Adapter2.default.Intraday
});

var AlphaSector = (0, _loadItem2.default)({
  fnFetch: _fn.fnFetch,
  api: _Api2.default.Alpha,
  adapter: _Adapter2.default.Sector
});

var Barchart = (0, _loadItem2.default)({
  fnFetch: _fnJsonp.fnFetch,
  api: _Api2.default.Barchart,
  adapter: _BarchartAdapter2.default
});

var Insee = (0, _loadItem2.default)({
  fnFetch: _fnFetchTxt2.default,
  api: _Api2.default.Insee,
  adapter: _InseeAdapter2.default
});

exports.default = {
  Quandl: Quandl,
  EuroStat: EuroStat,
  Insee: Insee,

  AlphaIndicator: AlphaIndicator,
  AlphaIntraday: AlphaIntraday,
  AlphaSector: AlphaSector,

  Barchart: Barchart
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadImpl.js.map