'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _fnDescr = require('./fnDescr');

var _fnDescr2 = _interopRequireDefault(_fnDescr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _parser = new window.DOMParser();

//€

var _crZhConfig = function _crZhConfig(id) {
  return {
    id: id,
    key: id,
    isWithLegend: false,
    dataSource: "INSEE"
  };
};

var _toData = function _toData(str) {
  var xml = _parser.parseFromString(str, 'text/xml'),
      series = xml.getElementsByTagName('Series'),
      data = [],
      info = [];
  var i = 0,
      max = series.length,
      _seria = void 0,
      _v = void 0;

  for (i; i < max; i++) {
    _seria = series[i];
    info.push({
      id: _seria.getAttribute('IDBANK'),
      title: _seria.getAttribute('TITLE_EN'),
      frequency: _seria.getAttribute('FREQ'),
      updatedOn: _seria.getAttribute('LAST_UPDATE'),
      unitMeasure: _seria.getAttribute('UNIT_MEASURE'),
      unitMult: _seria.getAttribute('UNIT_MULT')
    });

    _seria.childNodes.forEach(function (node) {
      _v = parseFloat(node.getAttribute('OBS_VALUE'));
      if (!Number.isNaN(_v)) {
        data.push([_AdapterFn2.default.ymdToUTC(node.getAttribute('TIME_PERIOD')), _v]);
      }
    });
  }

  return {
    data: data.sort(_AdapterFn2.default.compareByDate),
    info: info
  };
};

var InseeAdapter = {
  toConfig: function toConfig(str, option) {
    var value = option.value,
        title = option.title,
        subtitle = option.subtitle,
        _toData2 = _toData(str),
        data = _toData2.data,
        info = _toData2.info,
        config = (0, _ConfigBuilder2.default)().areaConfig({ spacingTop: 25 }).addCaption(title, subtitle).addPoints(value, data).addMinMax(data, option).add({
      info: _fnDescr2.default.toInfo(info, title),
      valueMoving: _AdapterFn2.default.valueMoving(data),
      zhConfig: _crZhConfig(value)
    }).toConfig();

    return { config: config };
  },
  toSeries: function toSeries(str, option) {
    var value = option.value,
        title = option.title,
        subtitle = option.subtitle,
        _text = subtitle ? subtitle : title,
        _toData3 = _toData(str),
        data = _toData3.data;

    return (0, _ConfigBuilder2.default)().initSeria().addPoints(value, data, _text).toSeria();
  }
};

exports.default = InseeAdapter;
//# sourceMappingURL=InseeAdapter.js.map