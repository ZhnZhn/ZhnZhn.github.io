'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _rSeries2;

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _IndicatorSma = require('../IndicatorSma');

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

  BBANDS: 'BBANDS',
  BBANDS_U: 'Real Upper Band',
  BBANDS_M: 'Real Middle Band',
  BBANDS_L: 'Real Lower Band',

  BLACK: { color: 'black' },
  RED: { color: '#f44336' },
  BLUE: { color: 'rgb(47, 126, 216)' },
  BLUE_A: { color: 'rgba(47, 126, 216, 0.75)' },
  GREEN: { color: '#4caf50' }
};

var _crZhConfig = function _crZhConfig(id) {
  return {
    id: id,
    key: id,
    isWithLegend: false,
    dataSource: "Alpha Vantage"
  };
};

var _crValuePropName = function _crValuePropName(indicator) {
  switch (indicator) {
    case 'AD':
      return 'Chaikin A/D';
    default:
      return indicator;
  }
};

var _crValue = function _crValue(json, option) {
  var indicator = option.indicator,
      _option$forDays = option.forDays,
      forDays = _option$forDays === undefined ? C.TWO_YEARS_DAYS : _option$forDays,
      _indicator = _crValuePropName(indicator),
      value = json[C.TA + ' ' + _indicator],
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
      _indicator = _crValuePropName(indicator),
      _crValue2 = _crValue(json, option),
      value = _crValue2.value,
      dateKeys = _crValue2.dateKeys,
      max = _crValue2.max,
      _data = [];


  var i = max,
      _date = void 0,
      _v = void 0;
  for (; i > -1; i--) {
    _date = dateKeys[i];
    _v = parseFloat(value[_date][_indicator]);
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

var _crBbandsSeries = function _crBbandsSeries(json, option) {
  var ticket = option.ticket,
      _arrs = _toDataArrs(_crValue(json, option), [C.BBANDS_M, C.BBANDS_U, C.BBANDS_L]),
      sMiddle = _crSplineSeria({
    data: _arrs[0], valueText: C.BBANDS_M, ticket: ticket
  }, C.BLUE),
      sUpper = _crSplineSeria({
    data: _arrs[1], valueText: C.BBANDS_U, ticket: ticket
  }, C.GREEN),
      sLow = _crSplineSeria({
    data: _arrs[2], valueText: C.BBANDS_L, ticket: ticket
  }, C.RED);


  return [sMiddle, sUpper, sLow];
};

var _rSeries = (_rSeries2 = {
  DF: _crSeria
}, (0, _defineProperty3.default)(_rSeries2, C.MACD, _crMacdSeries), (0, _defineProperty3.default)(_rSeries2, C.STOCH, _crStochSeries), (0, _defineProperty3.default)(_rSeries2, C.BBANDS, _crBbandsSeries), _rSeries2);

var AlphaAdapter = {
  toConfig: function toConfig(json, option) {
    var indicator = option.indicator,
        ticket = option.ticket,
        _chartId = ticket + '-' + indicator,
        _series = this.toSeries(json, option),
        _isArrSeries = Array.isArray(_series),
        _refSeries = _isArrSeries ? _series[0] : _series,
        type = _refSeries.type || 'spline',
        config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addSeriaBy(0, _refSeries).addSeriaBy(0, { type: type }).add('zhConfig', _crZhConfig(_chartId)).add('zhFnAddSeriesSma', _IndicatorSma.fnAddSeriesSma).add('zhFnRemoveSeries', _IndicatorSma.fnRemoveSeries).toConfig();

    if (_isArrSeries) {
      for (var i = 1; i < _series.length; i++) {
        config.series.push(_series[i]);
      }
    }

    return {
      config: config,
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },
  toSeries: function toSeries(json, option) {
    var _fnToSeries = _rSeries[option.indicator];
    if (_fnToSeries) {
      return _fnToSeries(json, option);
    } else {
      return _rSeries.DF(json, option);
    }
  }
};

exports.default = AlphaAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\alpha\AlphaAdapter.js.map