"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnUtil = _interopRequireDefault(require("./fnUtil"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var toUTC = _fnUtil["default"].toUTC,
    compose = _fnUtil["default"].compose;
var crDsValuesTimes = _fnAdapter["default"].crDsValuesTimes,
    crChartOption = _fnAdapter["default"].crChartOption;
var DF_TYPE = 'spline';
var _isArr = Array.isArray;

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

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

var _crSplineSeria = function _crSplineSeria(data, option) {
  if (option === void 0) {
    option = {};
  }

  var _option = option,
      seriaType = _option.seriaType,
      seriaColor = _option.seriaColor,
      _type = _isStr(seriaType) ? seriaType.toLowerCase() : DF_TYPE;

  return Object.assign(_ChartConfig["default"].fSeries(), {
    type: _type,
    color: seriaColor,
    visible: true,
    data: data,
    marker: {
      symbol: 'circle'
    },
    zhSeriaId: _fnAdapter["default"].crId()
  });
};

var toArea = {
  crConfig: function crConfig(json, option) {
    var _option$title = option.title,
        title = _option$title === void 0 ? '' : _option$title,
        subtitle = option.subtitle,
        _crDsValuesTimes = crDsValuesTimes(json, option),
        ds = _crDsValuesTimes.ds,
        values = _crDsValuesTimes.values,
        times = _crDsValuesTimes.times,
        data = _toData(values, times),
        seria = _crSplineSeria(data, option);

    return (0, _ConfigBuilder["default"])().areaConfig({
      spacingTop: 25
    }).addCaption(title, subtitle).clearSeries().addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, crChartOption(ds, data, option))).toConfig();
  }
};
var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toSpline.js.map