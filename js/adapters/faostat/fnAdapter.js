"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _fnDescr = _interopRequireDefault(require("./fnDescr"));

var isYNumber = _AdapterFn["default"].isYNumber,
    getValue = _AdapterFn["default"].getValue,
    toUpperCaseFirst = _AdapterFn["default"].toUpperCaseFirst,
    monthIndex = _AdapterFn["default"].monthIndex,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    valueMoving = _AdapterFn["default"].valueMoving,
    findMinY = _AdapterFn["default"].findMinY;
var _isArr = Array.isArray;
var C = {
  DATASET_EMPTY: 'Dataset is empty',
  ENPTY: '',
  BLANK: ' ',
  MM_DD: '-12-31',
  DF_TITLE: 'More about data on tab Info in Description'
};

var _crUnit = function _crUnit(json) {
  var _json$data = json.data,
      data = _json$data === void 0 ? [] : _json$data,
      item = data[data.length - 1] || {},
      _unit = item.Unit === undefined ? C.DATASET_EMPTY : item.Unit || C.BLANK;

  return toUpperCaseFirst(_unit);
};

var _crPoint = function _crPoint(_ref) {
  var Year = _ref.Year,
      Months = _ref.Months,
      Value = _ref.Value;
  var m = Months ? monthIndex(Months) + 1 : 0,
      Tail = m !== 0 ? "-" + m : C.MM_DD;
  return {
    x: ymdToUTC('' + Year + Tail),
    y: Value
  };
};

var _crHm = function _crHm(json) {
  var _json$data2 = json.data,
      data = _json$data2 === void 0 ? [] : _json$data2,
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
  var propName;

  for (propName in hm) {
    var _arr = hm[propName];
    legend.push((0, _extends2["default"])({}, _arr[_arr.length - 1], {
      Area: propName
    }));
  }

  return legend.filter(isYNumber).sort(_compareByY).reverse();
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
      data = _json$data3 === void 0 ? [] : _json$data3;
  return data.map(_crPoint).sort(_compareByX);
};

var _isSeriesReq = function _isSeriesReq(_ref2) {
  var items = _ref2.items;
  var it1 = getValue(items[0]);
  return it1.indexOf('>') !== -1;
};

var fnAdapter = {
  getValue: getValue,
  findMinY: findMinY,
  crId: function crId(_ref3) {
    var _itemKey = _ref3._itemKey;
    return _itemKey;
  },
  crTitle: function crTitle(json, option) {
    var title = option.title,
        dfTitle = option.dfTitle,
        dfSubtitle = option.dfSubtitle,
        subtitle = option.subtitle;

    if (dfSubtitle) {
      return subtitle + " " + _crUnit(json) + ": " + title;
    }

    if (title) {
      return dfTitle ? dfTitle + ": " + title : title;
    }

    var _json$data4 = json.data,
        data = _json$data4 === void 0 ? [] : _json$data4,
        p = data[data.length - 1];

    if (p && typeof p === 'object') {
      var _p$Area = p.Area,
          Area = _p$Area === void 0 ? '' : _p$Area,
          _p$Item = p.Item,
          Item = _p$Item === void 0 ? '' : _p$Item,
          _p$Element = p.Element,
          Element = _p$Element === void 0 ? '' : _p$Element;
      return Area + " " + Item + " " + Element;
    } else {
      return C.DF_TITLE;
    }
  },
  crSubtitle: function crSubtitle(json, option) {
    var dfSubtitle = option.dfSubtitle,
        subtitle = option.subtitle;
    return dfSubtitle ? dfSubtitle : subtitle + ": " + _crUnit(json);
  },
  crSeriaData: _crSeriaData,
  toDataPoints: function toDataPoints(json, option) {
    return _isSeriesReq(option) ? _crSeriesData(json, option) : _crSeriaData(json, option);
  },
  toInfo: _fnDescr["default"].toInfo,
  crZhConfig: function crZhConfig(id, _ref4) {
    var dfDomain = _ref4.dfDomain,
        itemCaption = _ref4.itemCaption;
    return {
      id: id,
      key: id,
      isWithoutSma: true,
      dataSource: "FAOSTAT",
      linkFn: "FAO_STAT",
      item: dfDomain,
      itemCaption: itemCaption
    };
  },
  crValueMoving: function crValueMoving(points) {
    return _isArr(points) && !_isArr(points[0]) ? valueMoving(points) : void 0;
  },
  isSeriesReq: _isSeriesReq
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map