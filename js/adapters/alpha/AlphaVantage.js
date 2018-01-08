'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Api = require('./Api');

var _Api2 = _interopRequireDefault(_Api);

var _AlphaAdapter = require('./AlphaAdapter');

var _AlphaAdapter2 = _interopRequireDefault(_AlphaAdapter);

var _AlphaIntradayAdapter = require('./AlphaIntradayAdapter');

var _AlphaIntradayAdapter2 = _interopRequireDefault(_AlphaIntradayAdapter);

var _AlphaSectorAdapter = require('./AlphaSectorAdapter');

var _AlphaSectorAdapter2 = _interopRequireDefault(_AlphaSectorAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlphaVantage = {
  Indicator: { api: _Api2.default, adapter: _AlphaAdapter2.default },
  Intraday: { api: _Api2.default, adapter: _AlphaIntradayAdapter2.default },
  Sector: { api: _Api2.default, adapter: _AlphaSectorAdapter2.default }
};

exports.default = AlphaVantage;
//# sourceMappingURL=AlphaVantage.js.map