"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnUtil = _interopRequireDefault(require("./fnUtil"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var toUTC = _fnUtil["default"].toUTC,
    compose = _fnUtil["default"].compose;
var crDsValuesTimes = _fnAdapter["default"].crDsValuesTimes,
    crChartOption = _fnAdapter["default"].crChartOption;
var _isArr = Array.isArray;

var _filterLeadingNulls = function _filterLeadingNulls(data) {
  var _len = data.length;
  var i = 0;

  for (i; i < _len; i++) {
    if (data[i].y !== null) break;
  }

  return data.slice(i);
};

var _isReverse = function _isReverse(data) {
  return data.length > 2 && data[0].x > data[1].x;
};

var _checkOrder = function _checkOrder(data) {
  return _isReverse(data) ? data.reverse() : data;
};

var _fCrDataPoint = function _fCrDataPoint(values) {
  return function (time, i) {
    return {
      x: toUTC(time),
      y: values[i] ? values[i].value : null
    };
  };
};

var _postProcessData = compose(_filterLeadingNulls, _checkOrder);

var _toData = function _toData(values, times) {
  var _values = _isArr(values) ? values : [values],
      _crPoint = _fCrDataPoint(_values);

  return _isArr(times) ? _postProcessData(times.map(_crPoint)) : [];
};

var toArea = {
  crConfig: function crConfig(json, option) {
    var _option$title = option.title,
        title = _option$title === void 0 ? '' : _option$title,
        subtitle = option.subtitle,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        _crDsValuesTimes = crDsValuesTimes(json, option),
        ds = _crDsValuesTimes.ds,
        values = _crDsValuesTimes.values,
        times = _crDsValuesTimes.times,
        data = _toData(values, times),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth,
      data: data
    }).toSeria();

    return (0, _ConfigBuilder["default"])().areaConfig({
      spacingTop: 25
    }).addCaption(title, subtitle).clearSeries().addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, crChartOption(ds, data, option))).toConfig();
  }
};
var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toSpline.js.map