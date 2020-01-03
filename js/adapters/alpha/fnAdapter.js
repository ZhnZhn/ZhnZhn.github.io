"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend,
    valueMoving = _AdapterFn["default"].valueMoving;

var _crZhConfig = function _crZhConfig(id, dataSource) {
  return {
    id: id,
    key: id,
    isWithoutAdd: true,
    legend: stockSeriesLegend(),
    dataSource: dataSource || "Alpha Vantage"
  };
};

var fnAdapter = {
  crIntradayConfigOption: function crIntradayConfigOption(_ref) {
    var id = _ref.id,
        data = _ref.data,
        dataSource = _ref.dataSource;
    return {
      zhConfig: _crZhConfig(id, dataSource),
      valueMoving: valueMoving(data)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map