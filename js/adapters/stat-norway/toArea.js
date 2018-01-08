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

var _IndicatorSma = require('../IndicatorSma');

var _fnUtil = require('./fnUtil');

var _fnUtil2 = _interopRequireDefault(_fnUtil);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toUTC = _fnUtil2.default.toUTC;
var crDsValuesTimes = _fnAdapter2.default.crDsValuesTimes,
    crChartOption = _fnAdapter2.default.crChartOption;


var _toData = function _toData(values, times) {
  var _values = Array.isArray(values) ? values : [values];
  var data = times.map(function (time, i) {
    return {
      x: _toUTC(time),
      y: _values[i].value
    };
  });

  return data;
};

var _crSplineSeria = function _crSplineSeria(data) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign(_ChartConfig2.default.fSeries(), {
    type: 'spline',
    visible: true,
    data: data,
    marker: {
      symbol: 'circle'
    },
    zhSeriaId: _fnAdapter2.default.crId()
  }, option);
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
        config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addCaption(title, subtitle).clearSeries().addSeries(seria).add((0, _extends3.default)({}, crChartOption(ds, data, option), {
      zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
      zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries
    })).toConfig();

    return config;
  }
};

exports.default = toArea;
//# sourceMappingURL=toArea.js.map