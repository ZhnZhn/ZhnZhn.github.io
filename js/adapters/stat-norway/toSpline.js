'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _fnUtil = require('./fnUtil');

var _fnUtil2 = _interopRequireDefault(_fnUtil);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toUTC = _fnUtil2.default.toUTC;
var crDsValuesTimes = _fnAdapter2.default.crDsValuesTimes,
    crChartOption = _fnAdapter2.default.crChartOption;


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

var _crSplineSeria = function _crSplineSeria(data) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var seriaType = option.seriaType,
      seriaColor = option.seriaColor,
      _type = typeof seriaType === 'string' ? seriaType.toLowerCase() : DF_TYPE;

  return Object.assign(_ChartConfig2.default.fSeries(), {
    type: _type,
    color: seriaColor,
    visible: true,
    data: data,
    marker: {
      symbol: 'circle'
    },
    zhSeriaId: _fnAdapter2.default.crId()
  });
};

var toArea = {
  crConfig: function crConfig(json, option) {
    var _option$title = option.title,
        title = _option$title === undefined ? '' : _option$title,
        subtitle = option.subtitle,
        _crDsValuesTimes = crDsValuesTimes(json, option),
        ds = _crDsValuesTimes.ds,
        values = _crDsValuesTimes.values,
        times = _crDsValuesTimes.times,
        data = _toData(values, times),
        seria = _crSplineSeria(data, option),
        config = (0, _ConfigBuilder2.default)().areaConfig({ spacingTop: 25 }).addCaption(title, subtitle).clearSeries().addSeries(seria).addMinMax(data, option).add((0, _extends3.default)({}, crChartOption(ds, data, option))).toConfig();

    return config;
  }
};

exports.default = toArea;
//# sourceMappingURL=toSpline.js.map