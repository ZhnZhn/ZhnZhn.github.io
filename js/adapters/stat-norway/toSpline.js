"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnUtil = _interopRequireDefault(require("./fnUtil"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _toUTC = _fnUtil["default"].toUTC;
var crDsValuesTimes = _fnAdapter["default"].crDsValuesTimes,
    crChartOption = _fnAdapter["default"].crChartOption;
var DF_TYPE = 'spline';

var _checkOrder = function _checkOrder(data) {
  var _isReverse = data.length > 2 && data[0].x > data[1].x;

  return _isReverse ? data.reverse() : data;
};

var _toData = function _toData(values, times) {
  var _values = Array.isArray(values) ? values : [values];

  var data = times.map(function (time, i) {
    return {
      x: _toUTC(time),
      y: _values[i] ? _values[i].value : null
    };
  });
  return _checkOrder(data);
};

var _crSplineSeria = function _crSplineSeria(data, option) {
  if (option === void 0) {
    option = {};
  }

  var _option = option,
      seriaType = _option.seriaType,
      seriaColor = _option.seriaColor,
      _type = typeof seriaType === 'string' ? seriaType.toLowerCase() : DF_TYPE;

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
        seria = _crSplineSeria(data, option),
        config = (0, _ConfigBuilder["default"])().areaConfig({
      spacingTop: 25
    }).addCaption(title, subtitle).clearSeries().addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, crChartOption(ds, data, option))).toConfig();

    return config;
  }
};
var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toSpline.js.map