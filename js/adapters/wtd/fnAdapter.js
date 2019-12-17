"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _AdapterStockFn = _interopRequireDefault(require("../AdapterStockFn"));

var toFloatOrNull = _AdapterFn["default"].toFloatOrNull,
    valueMoving = _AdapterFn["default"].valueMoving;
var toSeriesData = _AdapterStockFn["default"].toSeriesData;

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemId = _ref._itemId,
      value = _ref.value,
      dataSource = _ref.dataSource;
  return {
    dataSource: dataSource,
    id: _itemId,
    key: _itemId,
    item: value,
    linkFn: "NASDAQ",
    isWithLegend: true,
    isWithoutAdd: true,
    legend: _AdapterFn["default"].stockSeriesLegend()
  };
};

var _crInfo = function _crInfo(_ref2) {
  var title = _ref2.title,
      toDate = _ref2.toDate,
      fromDate = _ref2.fromDate;
  return {
    frequency: "Daily",
    name: title,
    toDate: toDate,
    fromDate: fromDate
  };
};

var _crPoint = function _crPoint(_temp, date) {
  var _ref3 = _temp === void 0 ? {} : _temp,
      open = _ref3.open,
      close = _ref3.close,
      high = _ref3.high,
      low = _ref3.low,
      volume = _ref3.volume;

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
  crConfigOption: function crConfigOption(_ref4) {
    var data = _ref4.data,
        option = _ref4.option;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map