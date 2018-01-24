"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require("../AdapterFn");

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stockSeriesLegend = _AdapterFn2.default.stockSeriesLegend,
    valueMoving = _AdapterFn2.default.valueMoving,
    crZhFn = _AdapterFn2.default.crZhFn;


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
    return (0, _extends3.default)({
      zhConfig: _crZhConfig(id),
      valueMoving: valueMoving(data)
    }, crZhFn());
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\alpha\fnAdapter.js.map