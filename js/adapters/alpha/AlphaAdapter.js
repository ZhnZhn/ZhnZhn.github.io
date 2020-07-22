"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _rSeries2;

var ymdToUTC = _AdapterFn["default"].ymdToUTC;
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
  BLACK: {
    color: 'black'
  },
  RED: {
    color: '#f44336'
  },
  BLUE: {
    color: 'rgb(47, 126, 216)'
  },
  COLOR_BLUE_A: 'rgba(47, 126, 216, 0.75)',
  GREEN: {
    color: '#4caf50'
  }
};
var _assign = Object.assign;

var _crZhConfig = function _crZhConfig(id) {
  return {
    id: id,
    key: id,
    itemCaption: id,
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
      forDays = _option$forDays === void 0 ? C.TWO_YEARS_DAYS : _option$forDays,
      _indicator = _crValuePropName(indicator),
      value = json[C.TA + " " + _indicator],
      dateKeys = value ? Object.keys(value).sort().reverse() : [],
      _len = dateKeys.length,
      max = _len < forDays ? _len - 1 : forDays;

  return {
    value: value,
    dateKeys: dateKeys,
    max: max
  };
};

var _toDataArrs = function _toDataArrs(_ref, arrProp) {
  var dateKeys = _ref.dateKeys,
      value = _ref.value,
      max = _ref.max;

  var i, j, _date, _x, _v;

  var result = [],
      _maxProp = arrProp.length;

  for (j = 0; j < _maxProp; j++) {
    result.push([]);
  }

  for (i = max; i > -1; i--) {
    _date = dateKeys[i];
    _x = ymdToUTC(_date);
    _v = value[_date];

    for (j = 0; j < _maxProp; j++) {
      result[j].push([_x, parseFloat(_v[arrProp[j]])]);
    }
  }

  return result;
};

var _crSplineSeria = function _crSplineSeria(_ref2, option) {
  var data = _ref2.data,
      valueText = _ref2.valueText;
  return _assign(_ChartConfig["default"].crSeria(), {
    type: 'spline',
    visible: true,
    data: data,
    marker: {
      symbol: 'circle'
    },
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
      _date,
      _v;

  for (; i > -1; i--) {
    _date = dateKeys[i];
    _v = parseFloat(value[_date][_indicator]);

    _data.push([ymdToUTC(_date), _v]);
  }

  return _data;
};

var _crSeria = function _crSeria(json, option) {
  var indicator = option.indicator,
      _data = _crSeriaData(json, option);

  return _crSplineSeria({
    data: _data,
    valueText: indicator
  });
};

var _crMacdSeries = function _crMacdSeries(json, option) {
  var _arrs = _toDataArrs(_crValue(json, option), [C.MACD, C.MACD_S, C.MACD_H]),
      sMcad = _crSplineSeria({
    data: _arrs[0],
    valueText: C.MACD
  }, C.BLACK),
      sSignal = _crSplineSeria({
    data: _arrs[1],
    valueText: C.MACD_S
  }, C.RED),
      sHist = _assign(_ChartConfig["default"].crSeria(), {
    color: C.COLOR_BLUE_A,
    data: _arrs[2],
    zhValueText: C.MACD_H,
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
  var _arrs = _toDataArrs(_crValue(json, option), [C.SLOW_K, C.SLOW_D]),
      sSlowK = _crSplineSeria({
    data: _arrs[0],
    valueText: C.SLOW_K
  }, C.BLUE),
      sSlowD = _crSplineSeria({
    data: _arrs[1],
    valueText: C.SLOW_D
  }, C.RED);

  return [sSlowK, sSlowD];
};

var _crBbandsSeries = function _crBbandsSeries(json, option) {
  var _arrs = _toDataArrs(_crValue(json, option), [C.BBANDS_M, C.BBANDS_U, C.BBANDS_L]),
      sMiddle = _crSplineSeria({
    data: _arrs[0],
    valueText: C.BBANDS_M
  }, C.BLUE),
      sUpper = _crSplineSeria({
    data: _arrs[1],
    valueText: C.BBANDS_U
  }, C.GREEN),
      sLow = _crSplineSeria({
    data: _arrs[2],
    valueText: C.BBANDS_L
  }, C.RED);

  return [sMiddle, sUpper, sLow];
};

var _rSeries = (_rSeries2 = {
  DF: _crSeria
}, _rSeries2[C.MACD] = _crMacdSeries, _rSeries2[C.STOCH] = _crStochSeries, _rSeries2[C.BBANDS] = _crBbandsSeries, _rSeries2);

var AlphaAdapter = {
  toConfig: function toConfig(json, option) {
    var ticket = option.ticket,
        value = option.value,
        _chartId = ticket + "-" + value,
        _title = ticket + ": " + value,
        _series = this.toSeries(json, option),
        config = (0, _ConfigBuilder["default"])().areaConfig({
      spacingTop: 25
    }).addCaption(_title).clearSeries().addSeries(_series).add({
      zhConfig: _crZhConfig(_chartId)
    }).toConfig();

    return {
      config: config,
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },
  toSeries: function toSeries(json, option) {
    var _crSeries = _rSeries[option.indicator] || _rSeries.DF;

    return _crSeries(json, option);
  }
};
var _default = AlphaAdapter;
exports["default"] = _default;
//# sourceMappingURL=AlphaAdapter.js.map