'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TWO_YEARS_DAYS = 501;

var _createSeriaData = function _createSeriaData(json, option) {
  var indicator = option.indicator,
      _option$forDays = option.forDays,
      forDays = _option$forDays === undefined ? TWO_YEARS_DAYS : _option$forDays,
      _propName = 'Technical Analysis: ' + indicator,
      _value = json[_propName],
      _dateKeys = _value ? Object.keys(_value).sort().reverse() : [],
      _len = _dateKeys.length,
      _max = _len < forDays ? _len : forDays,
      _data = [];

  var i = 1,
      _date = void 0,
      _v = void 0;
  for (i = _max; i > 1; i--) {
    _date = _dateKeys[i];
    _v = parseFloat(_value[_date][indicator]);
    _data.push([_AdapterFn2.default.ymdToUTC(_date), _v]);
  }

  return _data;
};

var AlphaAdapter = {
  toConfig: function toConfig(json, option) {
    var config = _ChartConfig2.default.fBaseAreaConfig(),
        indicator = option.indicator,
        ticket = option.ticket,
        _chartId = ticket + '-' + indicator,
        _data = _createSeriaData(json, option);


    config.series[0] = {
      data: _data,
      type: 'area',
      lineWidth: 1
    };
    config.chart.spacingTop = 25;
    config.zhConfig = {
      columnName: "Close",
      dataColumn: 4,
      dataSource: "Alpha",
      id: _chartId,
      isWithLegend: false,
      key: _chartId,
      linkFn: "NASDAQ"
    };

    return {
      config: config,
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },
  toSeries: function toSeries(json, option) {
    var seria = _ChartConfig2.default.fSeries(),
        indicator = option.indicator,
        ticket = option.ticket;


    seria.data = _createSeriaData(json, option);
    seria.zhSeriaId = ticket + '_' + indicator;
    seria.zhValueText = indicator;

    return seria;
  }
};

exports.default = AlphaAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\alpha\AlphaAdapter.js.map