"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf,
    stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend,
    valueMoving = _AdapterFn["default"].valueMoving;

var _crItemConf = function _crItemConf(_ref, option) {
  var id = _ref.id,
      dataSource = _ref.dataSource,
      data = _ref.data;
  var indicator = option.indicator,
      ticket = option.ticket,
      dfT = option.dfT,
      interval = option.interval;
  return indicator === 'TIME_SERIES_DAILY' ? (0, _extends2["default"])({
    _itemKey: id
  }, crItemConf(option), crValueConf(data), {
    dfT: dfT,
    interval: interval,
    indicator: indicator,
    ticket: ticket,
    dataSource: dataSource
  }) : void 0;
};

var _crZhConfig = function _crZhConfig(config, option) {
  var id = config.id,
      dataSource = config.dataSource,
      itemConf = _crItemConf(config, option);

  return {
    id: id,
    key: id,
    itemConf: itemConf,
    legend: stockSeriesLegend(),
    dataSource: dataSource || "Alpha Vantage"
  };
};

var fnAdapter = {
  crIntradayConfigOption: function crIntradayConfigOption(config, option) {
    return {
      zhConfig: _crZhConfig(config, option),
      valueMoving: valueMoving(config.data)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map