"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _AdapterStockFn = _interopRequireDefault(require("../AdapterStockFn"));

var crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf,
    toFloatOrNull = _AdapterFn["default"].toFloatOrNull,
    valueMoving = _AdapterFn["default"].valueMoving;
var toSeriesData = _AdapterStockFn["default"].toSeriesData;

var _crZhConfig = function _crZhConfig(option, data) {
  var _itemId = option._itemId,
      value = option.value,
      dataSource = option.dataSource;
  return {
    id: _itemId,
    key: _itemId,
    item: _itemId,
    linkFn: "NASDAQ",
    dataSource: dataSource,
    itemConf: (0, _extends2["default"])({
      _itemKey: _itemId
    }, crItemConf(option), {}, crValueConf(data), {
      symbol: value,
      dataSource: dataSource
    }),
    legend: _AdapterFn["default"].stockSeriesLegend()
  };
};

var _crInfo = function _crInfo(_ref) {
  var title = _ref.title,
      toDate = _ref.toDate,
      fromDate = _ref.fromDate;
  return {
    frequency: "Daily",
    name: title,
    toDate: toDate,
    fromDate: fromDate
  };
};

var _crPoint = function _crPoint(_temp, date) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      open = _ref2.open,
      close = _ref2.close,
      high = _ref2.high,
      low = _ref2.low,
      volume = _ref2.volume;

  return {
    date: date,
    open: toFloatOrNull(open),
    close: toFloatOrNull(close),
    high: toFloatOrNull(high),
    low: toFloatOrNull(low),
    volume: toFloatOrNull(volume)
  };
};

var fnAdapter = {
  crData: function crData(json, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        history = json.history,
        keys = Object.keys(history),
        arrPoint = [],
        max = keys.length;
    var i = 0;

    for (i; i < max; i++) {
      var _dateKey = keys[i];
      arrPoint.push(_crPoint(history[_dateKey], _dateKey));
    }

    return toSeriesData(arrPoint, {
      isNotZoomToMinMax: isNotZoomToMinMax,
      isDrawDeltaExtrems: isDrawDeltaExtrems
    });
  },
  crConfigOption: function crConfigOption(_ref3) {
    var data = _ref3.data,
        option = _ref3.option;
    return {
      zhConfig: _crZhConfig(option, data),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map