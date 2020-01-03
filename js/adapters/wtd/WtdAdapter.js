"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _WtdHistorical = _interopRequireDefault(require("./WtdHistorical"));

var _WtdIntraday = _interopRequireDefault(require("./WtdIntraday"));

var _rAdapter = {
  DF: _WtdHistorical["default"],
  intraday: _WtdIntraday["default"]
};

var _getAdapter = function _getAdapter(_ref) {
  var dfType = _ref.dfType;
  return _rAdapter[dfType] || _rAdapter.DF;
};

var WtdAdapter = {
  crKey: function crKey(option) {
    if (option === void 0) {
      option = {};
    }

    return _getAdapter(option).crKey(option);
  },
  toConfig: function toConfig(json, option) {
    if (option === void 0) {
      option = {};
    }

    return _getAdapter(option).toConfig(json, option);
  },
  toSeries: function toSeries(json, option) {
    var _WtdAdapter$toConfig = WtdAdapter.toConfig(json, option),
        config = _WtdAdapter$toConfig.config;

    return config.series[0];
  }
};
var _default = WtdAdapter;
exports["default"] = _default;
//# sourceMappingURL=WtdAdapter.js.map