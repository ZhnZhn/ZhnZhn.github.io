"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require("../AdapterFn");

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stockSeriesLegend = _AdapterFn2.default.stockSeriesLegend,
    valueMoving = _AdapterFn2.default.valueMoving;


var _crZhConfig = function _crZhConfig(id) {
  return {
    id: id,
    key: id,
    isWithLegend: true,
    legend: stockSeriesLegend(),
    dataSource: "Alpha Vantage"
  };
};

var fnAdapter = {
  crIntradayConfigOption: function crIntradayConfigOption(_ref) {
    var id = _ref.id,
        data = _ref.data;
    return {
      zhConfig: _crZhConfig(id),
      valueMoving: valueMoving(data)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map