"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _AdapterStockFn = _interopRequireDefault(require("../AdapterStockFn"));

var crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf,
    valueMoving = _AdapterFn["default"].valueMoving,
    joinBy = _AdapterFn["default"].joinBy;
var toSeriesData = _AdapterStockFn["default"].toSeriesData;
var DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" + "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>";
var DATA_SOURCE = "Barchart Market Data Solutions";

var _crInfo = function _crInfo(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      _ref$subtitle = _ref.subtitle,
      subtitle = _ref$subtitle === void 0 ? '' : _ref$subtitle;
  return {
    description: DESCR,
    frequency: "Daily",
    name: title + " " + subtitle,
    toDate: _DateUtils["default"].getFromDate(0),
    fromDate: _DateUtils["default"].getFromDate(1)
  };
};

var _crZhConfig = function _crZhConfig(id, data, option) {
  var value = option.value,
      linkFn = option.linkFn,
      dfT = option.dfT,
      items = option.items,
      dataSource = DATA_SOURCE;
  return {
    key: value,
    item: value,
    columnName: "Close",
    dataSource: dataSource,
    id: id,
    linkFn: linkFn,
    itemConf: (0, _extends2["default"])({
      _itemKey: value
    }, crItemConf(option), {}, crValueConf(data), {
      value: value,
      dataSource: dataSource,
      dfT: dfT,
      items: items
    }),
    legend: _AdapterFn["default"].stockSeriesLegend()
  };
};

var fnAdapter = {
  toSeriesData: toSeriesData,
  joinBy: joinBy,
  crChartId: function crChartId(option) {
    var _option$value = option.value,
        value = _option$value === void 0 ? '' : _option$value;
    return "B/" + value;
  },
  crData: function crData(json, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems;
    return toSeriesData(json.results, {
      pnDate: 'tradingDay',
      isNotZoomToMinMax: isNotZoomToMinMax,
      isDrawDeltaExtrems: isDrawDeltaExtrems
    });
  },
  crConfigOption: function crConfigOption(_ref2) {
    var chartId = _ref2.chartId,
        option = _ref2.option,
        data = _ref2.data;
    return {
      valueMoving: valueMoving(data),
      info: _crInfo(option),
      zhConfig: _crZhConfig(chartId, data, option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map