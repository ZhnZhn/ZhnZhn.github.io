'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _fnDescr = require('./fnDescr');

var _fnDescr2 = _interopRequireDefault(_fnDescr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;


var C = {
  DATASET_EMPTY: "Dataset is empty",
  ONE_BLANK: " ",
  MM_DD: '-12-31'
};

var _crUnit = function _crUnit(json) {
  var _json$data = json.data,
      data = _json$data === undefined ? [] : _json$data,
      item = data[data.length - 1] || {},
      _unit = item.Unit === undefined ? C.DATASET_EMPTY : item.Unit ? item.Unit : C.ONE_BLANK;

  return _unit[0].toUpperCase() + _unit.substr(1);
};

var _crPoint = function _crPoint(_ref) {
  var Year = _ref.Year,
      Value = _ref.Value;
  return {
    x: ymdToUTC('' + Year + C.MM_DD),
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

var _crSeriaData = function _crSeriaData(json, option) {
  var _json$data3 = json.data,
      data = _json$data3 === undefined ? [] : _json$data3;

  return data.map(function (item) {
    return _crPoint(item);
  });
};

var fnAdapter = {
  crId: function crId(_ref2) {
    var three = _ref2.three,
        value = _ref2.value;

    return three ? value + '_' + three : value;
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