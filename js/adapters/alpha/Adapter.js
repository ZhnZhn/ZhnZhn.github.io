'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AlphaAdapter = require('./AlphaAdapter');

var _AlphaAdapter2 = _interopRequireDefault(_AlphaAdapter);

var _AlphaIntradayAdapter = require('./AlphaIntradayAdapter');

var _AlphaIntradayAdapter2 = _interopRequireDefault(_AlphaIntradayAdapter);

var _AlphaSectorAdapter = require('./AlphaSectorAdapter');

var _AlphaSectorAdapter2 = _interopRequireDefault(_AlphaSectorAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Indicator: _AlphaAdapter2.default,
  Intraday: _AlphaIntradayAdapter2.default,
  Sector: _AlphaSectorAdapter2.default
};
//# sourceMappingURL=Adapter.js.map