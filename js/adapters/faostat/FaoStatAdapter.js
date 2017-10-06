'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _fnDescr = require('./fnDescr');

var _fnDescr2 = _interopRequireDefault(_fnDescr);

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crZhConfig = function _crZhConfig(id, _ref) {
  var dfDomain = _ref.dfDomain,
      oneCaption = _ref.oneCaption;
  return {
    id: id,
    key: id,
    dataSource: "FAOSTAT",
    linkFn: "FAO_STAT",
    item: dfDomain,
    itemCaption: oneCaption
  };
};

var _crId = function _crId(_ref2) {
  var three = _ref2.three,
      value = _ref2.value;
  return three ? value + '_' + three : value;
};

var _crUnit = function _crUnit(json) {
  var _json$data = json.data,
      data = _json$data === undefined ? [] : _json$data,
      item = data[data.length - 1] || {},
      _unit = item.Unit === undefined ? _conf2.default.DATASET_EMPTY : item.Unit ? item.Unit : _conf2.default.ONE_BLANK;

  return _unit[0].toUpperCase() + _unit.substr(1);
};

var _crSubtitle = function _crSubtitle(json, subtitle) {
  var _unit = _crUnit(json);
  return subtitle + ': ' + _unit;
};

var _crPoint = function _crPoint(_ref3) {
  var Year = _ref3.Year,
      Value = _ref3.Value;
  return {
    x: _AdapterFn2.default.ymdToUTC('' + Year + _conf2.default.MM_DD),
    y: Value
  };
};

var _crHm = function _crHm(json) {
  var _json$data2 = json.data,
      data = _json$data2 === undefined ? [] : _json$data2,
      hm = Object.create(null);


  data.forEach(function (item) {
    var Area = item.Area;

    if (!hm[Area]) {
      hm[Area] = [];
      hm[Area].seriaName = Area;
    }
    hm[Area].push(_crPoint(item));
  });
  return hm;
};

var _compareByY = function _compareByY(a, b) {
  return a.y - b.y;
};

var _crRefLegend = function _crRefLegend(hm) {
  var legend = [];
  var propName = void 0;
  for (propName in hm) {
    var _arr = hm[propName];
    legend.push((0, _extends3.default)({}, _arr[_arr.length - 1], {
      Area: propName
    }));
  }
  return legend.sort(_compareByY).reverse();
};

var _hmToPoints = function _hmToPoints(hm, arr) {
  var r = [];
  arr.forEach(function (item) {
    r.push(hm[item.Area]);
  });
  return r;
};

var _crSeriesData = function _crSeriesData(json) {
  var _hm = _crHm(json),
      _legend = _crRefLegend(_hm);

  return _hmToPoints(_hm, _legend);
};

var _crSeriaData = function _crSeriaData(json, option) {
  var _json$data3 = json.data,
      data = _json$data3 === undefined ? [] : _json$data3,
      points = [];

  data.forEach(function (item) {
    points.push(_crPoint(item));
  });

  return points;
};

var _toDataPoints = function _toDataPoints(json, option) {
  var one = option.one;

  return ('' + one).indexOf('>') === -1 ? _crSeriaData(json, option) : _crSeriesData(json, option);
};

var _checkToSeries = function _checkToSeries(option) {
  var one = option.one;

  return ('' + one).indexOf('>') === -1 ? true : false;
};

var FaoStatAdapter = {
  toConfig: function toConfig(json, option) {
    var title = option.title,
        subtitle = option.subtitle,
        _id = _crId(option),
        _subtitle = _crSubtitle(json, subtitle),
        _points = _toDataPoints(json, option),
        config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addCaption(title, _subtitle).addPoints(_id, _points).addTooltip(_Tooltip2.default.fnBasePointFormatter).add('info', _fnDescr2.default.toInfo(json, title, _subtitle)).add('zhConfig', _crZhConfig(_id, option)).toConfig();

    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _data = _crSeriaData(json, option),
        _id = _crId(option),
        parentId = option.parentId,
        oneCaption = option.oneCaption,
        _isAllow = _checkToSeries(option);

    if (!_isAllow) {
      throw new Error('ZH_1000');
    }
    return (0, _ConfigBuilder2.default)().initBaseSeria().add({
      data: _data,
      zhSeriaId: parentId + '_' + _id,
      zhValueText: oneCaption,
      zhItemCaption: oneCaption
    }).toConfig();
  }
};

exports.default = FaoStatAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\faostat\FaoStatAdapter.js.map