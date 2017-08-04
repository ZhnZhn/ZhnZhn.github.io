'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _IndicatorSma = require('../IndicatorSma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _parser = new window.DOMParser();

//€

var _toData = function _toData(str) {
  var xml = _parser.parseFromString(str, 'text/xml'),
      series = xml.getElementsByTagName('Series'),
      data = [],
      info = [];
  var i = 0,
      max = series.length,
      _seria = void 0,
      _v = void 0,
      minClose = Number.POSITIVE_INFINITY,
      maxClose = Number.NEGATIVE_INFINITY;
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

        if (minClose > _v) {
          minClose = _v;
        }
        if (maxClose < _v) {
          maxClose = _v;
        }
      }
    });
  }

  return {
    data: data.sort(_AdapterFn2.default.compareByDate),
    info: info,
    minClose: minClose, maxClose: maxClose
  };
};

var ST_TITLE = 'style="color:#1b75bb;"';
var _toInfo = function _toInfo(info, title) {
  var strDom = '';
  info.forEach(function (seria) {
    var title = seria.title,
        id = seria.id,
        updatedOn = seria.updatedOn,
        frequency = seria.frequency,
        unitMeasure = seria.unitMeasure,
        unitMult = seria.unitMult;

    strDom += '\n      <div style="color:black;">' + title + '</div>\n      <div>\n        <span ' + ST_TITLE + '>IDBANK:</span><span>' + id + '</span>\n        <span ' + ST_TITLE + '>Frequency:</span><span>' + frequency + '&nbsp;</span>\n        <span ' + ST_TITLE + '>UpdatedOn:</span><span>' + updatedOn + '&nbsp;</span>\n      </div>\n      <div>\n        <span ' + ST_TITLE + '>UnitMeasure:</span><span>' + unitMeasure + '&nbsp;</span>\n        <span ' + ST_TITLE + '>UnitMult:</span><span>' + unitMult + '&nbsp;</span>\n      </div>\n      <div>\n        <a href="https://www.insee.fr/en/statistiques/serie/' + id + '">INSEE Data Link</a>\n      </div>\n      <br/>\n    ';
  });
  return {
    name: title,
    description: strDom
  };
};

var InseeAdapter = {
  toConfig: function toConfig(str, option) {
    var value = option.value,
        title = option.title,
        subtitle = option.subtitle,
        config = _ChartConfig2.default.fBaseAreaConfig(),
        _toData2 = _toData(str),
        data = _toData2.data,
        info = _toData2.info,
        minClose = _toData2.minClose,
        maxClose = _toData2.maxClose;

    Object.assign(config.series[0], {
      data: data,
      type: 'spline',
      zhSeriaId: value
    });
    Object.assign(config, {
      title: _Chart2.default.fTitle({
        text: title,
        y: _Chart2.default.STACKED_TITLE_Y
      }),
      subtitle: _Chart2.default.fSubtitle({
        text: subtitle ? subtitle : 'INSEE',
        y: _Chart2.default.STACKED_SUBTITLE_Y
      }),
      info: _toInfo(info, title),
      valueMoving: _AdapterFn2.default.valueMoving(data),
      zhConfig: {
        id: value,
        key: value,
        isWithLegend: false,
        dataSource: "INSEE"
      },
      zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
      zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries
    });
    config.chart.spacingTop = 25;

    _ChartConfig2.default.setMinMax(config, minClose, maxClose);

    return { config: config };
  },
  toSeries: function toSeries(str, option) {
    var value = option.value,
        _toData3 = _toData(str),
        data = _toData3.data;

    return Object.assign(_ChartConfig2.default.fSeries(), {
      data: data,
      zhSeriaId: value,
      zhValueText: value
    });
  }
};

exports.default = InseeAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\insee\InseeAdapter.js.map