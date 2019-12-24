"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _conf = _interopRequireDefault(require("./conf"));

var _rFnCrPoint2;

var _toSortedArr = function _toSortedArr(obj) {
  var arr = [];

  for (var propName in obj) {
    arr.push(obj[propName]);
  }

  return arr.sort();
};

var _crPoint = function _crPoint(y, forSort) {
  return {
    y: y,
    forSort: forSort !== undefined ? forSort : y
  };
};

var _fCrValuePoint = function _fCrValuePoint(pnValue) {
  return function (item) {
    return _crPoint(item[pnValue]);
  };
};

var _crNetWeightPoint = function _crNetWeightPoint(item) {
  var _w = item.NetWeight || item.TradeQuantity,
      _y = _w !== 0 ? _w : item.TradeValue ? undefined : 0;

  return _crPoint(_y);
};

var _crAvgPricePoint = function _crAvgPricePoint(item) {
  var TradeValue = item.TradeValue,
      NetWeight = item.NetWeight,
      TradeQuantity = item.TradeQuantity,
      _NetWeight = NetWeight || TradeQuantity,
      _y = _NetWeight && TradeValue != null ? _fnAdapter["default"].roundBy(TradeValue / _NetWeight, 2) : undefined;

  return _crPoint(_y, _NetWeight);
};

var _rFnCrPoint = (_rFnCrPoint2 = {
  fDf: _fCrValuePoint
}, _rFnCrPoint2[_conf["default"].NET_WEIGHT] = _crNetWeightPoint, _rFnCrPoint2[_conf["default"].AVG_PRICE] = _crAvgPricePoint, _rFnCrPoint2);

var _fPoint = function _fPoint(pnValue) {
  var _crValue = _rFnCrPoint[pnValue] ? _rFnCrPoint[pnValue] : _rFnCrPoint.fDf(pnValue);

  return function (item) {
    return (0, _extends2["default"])({
      isCategory: true,
      x: item.period
    }, _crValue(item));
  };
};

var _getRecentValueForSort = function _getRecentValueForSort(points) {
  var len = points && points.length;
  return len && len > 0 ? points[len - 1].forSort : undefined;
};

var fnHm = {
  toSeriaNames: function toSeriaNames(hm, fnCompareBy) {
    var arr = [];

    for (var propName in hm) {
      if (propName !== _conf["default"].WORLD) {
        var points = hm[propName];
        arr.push({
          value: _getRecentValueForSort(points),
          name: propName
        });
      }
    }

    return arr.sort(fnCompareBy).reverse();
  },
  toHmCategories: function toHmCategories(_ref) {
    var dataset = _ref.dataset,
        _ref$pnCountry = _ref.pnCountry,
        pnCountry = _ref$pnCountry === void 0 ? 'ptTitle' : _ref$pnCountry,
        _ref$pnValue = _ref.pnValue,
        pnValue = _ref$pnValue === void 0 ? 'TradeValue' : _ref$pnValue;

    var _hm = Object.create(null),
        _category = Object.create(null),
        _crPoint = _fPoint(pnValue);

    var _point;

    dataset.forEach(function (item) {
      _point = _crPoint(item);

      if (_point.y != null) {
        var ptTitle = item[pnCountry];

        if (_hm[ptTitle] === undefined) {
          _hm[ptTitle] = [];
        }

        _hm[ptTitle].push(_point);

        var period = item.period;

        if (_category[period] === undefined) {
          _category[period] = period;
        }
      }
    });
    return {
      categories: _toSortedArr(_category),
      hm: _hm
    };
  }
};
var _default = fnHm;
exports["default"] = _default;
//# sourceMappingURL=fnHm.js.map