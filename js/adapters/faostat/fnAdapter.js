'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _fnDescr = require('./fnDescr');

var _fnDescr2 = _interopRequireDefault(_fnDescr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toUpperCaseFirst = _AdapterFn2.default.toUpperCaseFirst,
    monthIndex = _AdapterFn2.default.monthIndex,
    ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;


var C = {
  DATASET_EMPTY: 'Dataset is empty',
  ENPTY: '',
  BLANK: ' ',
  MM_DD: '-12-31',
  DF_TITLE: 'More about data on tab Info in Description'
};

var _crUnit = function _crUnit(json) {
  var _json$data = json.data,
      data = _json$data === undefined ? [] : _json$data,
      item = data[data.length - 1] || {},
      _unit = item.Unit === undefined ? C.DATASET_EMPTY : item.Unit ? item.Unit : C.BLANK;

  return toUpperCaseFirst(_unit);
};

var _crPoint = function _crPoint(_ref) {
  var Year = _ref.Year,
      Months = _ref.Months,
      Value = _ref.Value;

  var m = Months ? monthIndex(Months) + 1 : 0,
      Tail = m !== 0 ? '-' + m : C.MM_DD;

  return {
    x: ymdToUTC('' + Year + Tail),
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
  return arr.map(function (item) {
    return hm[item.Area];
  });
};

var _crSeriesData = function _crSeriesData(json) {
  var _hm = _crHm(json),
      _legend = _crRefLegend(_hm);

  return _hmToPoints(_hm, _legend);
};

var _compareByX = function _compareByX(a, b) {
  return a.x - b.x;
};

var _crSeriaData = function _crSeriaData(json, option) {
  var _json$data3 = json.data,
      data = _json$data3 === undefined ? [] : _json$data3;

  return data.map(_crPoint).sort(_compareByX);
};

var fnAdapter = {
  crId: function crId(_ref2) {
    var three = _ref2.three,
        value = _ref2.value;

    var _v = value || 'faoId';
    return three ? _v + '_' + three : _v;
  },
  crTitle: function crTitle(option, json) {
    var title = option.title,
        dfTitle = option.dfTitle;

    if (title) {
      return dfTitle ? dfTitle + ': ' + title : title;
    }
    var _json$data4 = json.data,
        data = _json$data4 === undefined ? [] : _json$data4,
        p = data[data.length - 1];

    if (p && (typeof p === 'undefined' ? 'undefined' : (0, _typeof3.default)(p)) === 'object') {
      var _p$Area = p.Area,
          Area = _p$Area === undefined ? '' : _p$Area,
          _p$Item = p.Item,
          Item = _p$Item === undefined ? '' : _p$Item,
          _p$Element = p.Element,
          Element = _p$Element === undefined ? '' : _p$Element;

      return Area + ' ' + Item + ' ' + Element;
    } else {
      return C.DF_TITLE;
    }
  },
  crSubtitle: function crSubtitle(json, subtitle) {
    var _unit = _crUnit(json);
    return subtitle + ': ' + _unit;
  },
  crSeriaData: _crSeriaData,
  toDataPoints: function toDataPoints(json, option) {
    var one = option.one;

    return ('' + one).indexOf('>') === -1 ? _crSeriaData(json, option) : _crSeriesData(json, option);
  },
  toInfo: _fnDescr2.default.toInfo,
  crZhConfig: function crZhConfig(id, _ref3) {
    var dfDomain = _ref3.dfDomain,
        oneCaption = _ref3.oneCaption;
    return {
      id: id,
      key: id,
      isWithoutIndicator: true,
      isWithoutAdd: true,
      dataSource: "FAOSTAT",
      linkFn: "FAO_STAT",
      item: dfDomain,
      itemCaption: oneCaption
    };
  },
  crValueMoving: function crValueMoving(points) {
    return Array.isArray(points) && !Array.isArray(points[0]) ? valueMoving(points) : undefined;
  },
  checkToSeries: function checkToSeries(_ref4) {
    var one = _ref4.one;

    return ('' + one).indexOf('>') === -1 ? true : false;
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\faostat\fnAdapter.js.map