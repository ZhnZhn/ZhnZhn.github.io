"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _AdapterStockFn = _interopRequireDefault(require("../AdapterStockFn"));

var valueMoving = _AdapterFn["default"].valueMoving;
var toSeriesData = _AdapterStockFn["default"].toSeriesData;
var DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" + "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>";
var TITLE = "Source: Barchart";

var _crInfo = function _crInfo(caption) {
  return {
    description: DESCR,
    frequency: "Daily",
    name: caption,
    toDate: _DateUtils["default"].getFromDate(0),
    fromDate: _DateUtils["default"].getFromDate(1)
  };
};

var _crZhConfig = function _crZhConfig(id, value) {
  return {
    columnName: "Close",
    dataSource: "Barchart Market Data Solutions",
    id: id,
    key: value,
    item: value,
    linkFn: "NASDAQ",
    legend: _AdapterFn["default"].stockSeriesLegend()
  };
};

var fnAdapter = {
  toSeriesData: toSeriesData,
  crTitle: function crTitle(option) {
    return {
      title: TITLE,
      subtitle: option.title || ''
    };
  },
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
  crConfigOption: function crConfigOption(_ref) {
    var chartId = _ref.chartId,
        option = _ref.option,
        data = _ref.data;
    var _option$title = option.title,
        title = _option$title === void 0 ? '' : _option$title,
        _option$value2 = option.value,
        value = _option$value2 === void 0 ? '' : _option$value2;
    return {
      valueMoving: valueMoving(data),
      info: _crInfo(title),
      zhConfig: _crZhConfig(chartId, value)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map