'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AlphaIndicatorDialog = require('./AlphaIndicatorDialog');

var _AlphaIndicatorDialog2 = _interopRequireDefault(_AlphaIndicatorDialog);

var _AlphaIntradayDialog = require('./AlphaIntradayDialog');

var _AlphaIntradayDialog2 = _interopRequireDefault(_AlphaIntradayDialog);

var _AlphaSectorDialog = require('./AlphaSectorDialog');

var _AlphaSectorDialog2 = _interopRequireDefault(_AlphaSectorDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlphaDialog = {
  Indicator: _AlphaIndicatorDialog2.default, Intraday: _AlphaIntradayDialog2.default, Sector: _AlphaSectorDialog2.default
};

exports.default = AlphaDialog;
//# sourceMappingURL=AlphaDialogs.js.map