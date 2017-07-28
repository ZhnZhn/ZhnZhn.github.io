'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  TWO_YEARS_DAYS: 501,
  TA: 'Technical Analysis:',

  MACD: 'MACD',
  MACD_S: 'MACD_Signal',
  MACD_H: 'MACD_Hist',

  STOCH: 'STOCH',
  SLOW_K: 'SlowK',
  SLOW_D: 'SlowD',

  BLACK: { color: 'black' },
  RED: { color: 'red' },
  BLUE: { color: 'rgb(47, 126, 216)' },
  BLUE_A: { color: 'rgba(47, 126, 216, 0.75)' }
};

var _crValue = function _crValue(json, option) {
  var indicator = option.indicator,
      _option$forDays = option.forDays,
      forDays = _option$forDays === undefined ? C.TWO_YEARS_DAYS : _option$forDays,
      value = json[C.TA + ' ' + indicator],
      dateKeys = value ? Object.keys(value).sort().reverse() : [],
      _len = dateKeys.length,
      max = _len < forDays ? _len - 1 : forDays;

  return { value: value, dateKeys: dateKeys, max: max };
};

var _toDataArrs = function _toDataArrs(_ref, arrProp) {
  var dateKeys = _ref.dateKeys,
      value = _ref.value,
      max = _ref.max;

  var i = void 0,
      j = void 0,
      _date = void 0,
      _x = void 0,
      _v = void 0;

  var result = [],
      _maxProp = arrProp.length;
  for (j = 0; j < _maxProp; j++) {
    result.push([]);
  }

  for (i = max; i > -1; i--) {
    _date = dateKeys[i];
    _x = _AdapterFn2.default.ymdtToUTC(_date);
    _v = value[_date];
    for (j = 0; j < _maxProp; j++) {
      result[j].push([_x, parseFloat(_v[arrProp[j]])]);
    }
  }
  return result;
};

var _crSplineSeria = function _crSplineSeria(_ref2, option) {
  var data = _ref2.data,
      ticket = _ref2.ticket,
      valueText = _ref2.valueText;

  return Object.assign(_ChartConfig2.default.fSeries(), {
    data: data,
    marker: {
      symbol: 'circle'
    },
    zhSeriaId: ticket + '_' + valueText,
    zhValueText: valueText
  }, option);
};

var _crSeriaData = function _crSeriaData(json, option) {
  var indicator = option.indicator,
      _crValue2 = _crValue(json, option),
      value = _crValue2.value,
      dateKeys = _crValue2.dateKeys,
      max = _crValue2.max,
      _data = [];


  var i = void 0,
      _date = void 0,
      _v = void 0;
  for (i = max; i > -1; i--) {
    _date = dateKeys[i];
    _v = parseFloat(value[_date][indicator]);
    _data.push([_AdapterFn2.default.ymdtToUTC(_date), _v]);
  }

  return _data;
};

var _crSeria = function _crSeria(json, option) {
  var indicator = option.indicator,
      ticket = option.ticket,
      _data = _crSeriaData(json, option);

  return _crSplineSeria({
    data: _data, valueText: indicator, ticket: ticket
  });
};

var _crMacdSeries = function _crMacdSeries(json, option) {
  var ticket = option.ticket,
      _arrs = _toDataArrs(_crValue(json, option), [C.MACD, C.MACD_S, C.MACD_H]),
      sMcad = _crSplineSeria({
    data: _arrs[0], valueText: C.MACD, ticket: ticket
  }, C.BLACK),
      sSignal = _crSplineSeria({
    data: _arrs[1], valueText: C.MACD_S, ticket: ticket
  }, C.RED),
      sHist = Object.assign(_ChartConfig2.default.fSeries(), {
    color: C.BLUE_A,
    data: _arrs[2],
    zhSeriaId: ticket + '_' + C.MCAD_H,
    zhValueText: C.MCAD_H,
    //type: 'area',
    //visible: true
    type: 'column',
    visible: false,
    shadow: false,
    borderWidth: 0,
    pointPlacement: 'on',
    pointPadding: 0,
    groupPadding: 0,
    turboThreshold: 20000
  });


  return [sHist, sSignal, sMcad];
};

var _crStochSeries = function _crStochSeries(json, option) {
  var ticket = option.ticket,
      _arrs = _toDataArrs(_crValue(json, option), [C.SLOW_K, C.SLOW_D]),
      sSlowK = _crSplineSeria({
    data: _arrs[0], valueText: C.SLOW_K, ticket: ticket
  }, C.BLUE),
      sSlowD = _crSplineSeria({
    data: _arrs[1], valueText: C.SLOW_D, ticket: ticket
  }, C.RED);


  return [sSlowK, sSlowD];
};

var AlphaAdapter = {
  toConfig: function toConfig(json, option) {
    var indicator = option.indicator,
        ticket = option.ticket,
        _chartId = ticket + '-' + indicator,
        config = _ChartConfig2.default.fBaseAreaConfig({
      zhConfig: {
        id: _chartId,
        key: _chartId,
        isWithLegend: false,
        dataSource: "Alpha"
      }
    }),
        _series = this.toSeries(json, option),
        _isArrSeries = Array.isArray(_series),
        _data = _isArrSeries ? _series[0].data : _series.data,
        _type = _isArrSeries ? _series[0].type : 'spline';

    config.series[0] = {
      data: _data,
      type: _type
    };
    if (_isArrSeries) {
      for (var i = 1; i < _series.length; i++) {
        config.series.push(_series[i]);
      }
    }
    config.chart.spacingTop = 25;

    return {
      config: config,
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },
  toSeries: function toSeries(json, option) {
    var indicator = option.indicator;

    var series = void 0;

    switch (indicator) {
      case C.MACD:
        series = _crMacdSeries(json, option);
        break;
      case C.STOCH:
        series = _crStochSeries(json, option);
        break;
      default:
        series = _crSeria(json, option);
    }

    return series;
  }
};

exports.default = AlphaAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\alpha\AlphaAdapter.js.map