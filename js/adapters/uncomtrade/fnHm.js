"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _conf = _interopRequireDefault(require("./conf"));

var _rCrPoint2;

//const { roundBy } = fnAdapter;
var NET_WEIGHT = 'NetWeight';
var QUANTITY = 'TradeQuantity';

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
    forSort: forSort !== void 0 ? forSort : y
  };
};

var _fCrValuePoint = function _fCrValuePoint(pnValue) {
  return function (item) {
    return _crPoint(item[pnValue]);
  };
};

var _fCrPoint = function _fCrPoint(pn, item) {
  var _w = item[pn],
      _y = _w !== 0 ? _w : item.TradeValue ? void 0 : 0;

  return _crPoint(_y);
};

var _crNetWeightPoint = _fCrPoint.bind(null, NET_WEIGHT);

var _crQuantityPoint = _fCrPoint.bind(null, QUANTITY);

var _fCrAvgPoint = function _fCrAvgPoint(pn, item) {
  var TradeValue = item.TradeValue,
      _v = item[pn],
      _y = _v && TradeValue != null ? _fnAdapter["default"].roundBy(TradeValue / _v, 2) : void 0;

  return _crPoint(_y, _v);
};

var _crAvgValuePerWeight = _fCrAvgPoint.bind(null, NET_WEIGHT);

var _crAvgValuePerQuantity = _fCrAvgPoint.bind(null, QUANTITY);

var _rCrPoint = (_rCrPoint2 = {
  fDf: _fCrValuePoint
}, _rCrPoint2[_conf["default"].NET_WEIGHT] = _crNetWeightPoint, _rCrPoint2[_conf["default"].QUANTITY] = _crQuantityPoint, _rCrPoint2[_conf["default"].AVG_PER_W] = _crAvgValuePerWeight, _rCrPoint2[_conf["default"].AVG_PER_Q] = _crAvgValuePerQuantity, _rCrPoint2);

var _fPoint = function _fPoint(pnValue) {
  var _crPoint = _rCrPoint[pnValue] || _rCrPoint.fDf(pnValue);

  return function (item) {
    return (0, _extends2["default"])({
      isCategory: true,
      x: item.period
    }, _crPoint(item));
  };
};

var _getRecentValueForSort = function _getRecentValueForSort(points) {
  var len = points && points.length;
  return len && len > 0 ? points[len - 1].forSort : void 0;
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

        if (_hm[ptTitle] === void 0) {
          _hm[ptTitle] = [];
        }

        _hm[ptTitle].push(_point);

        var period = item.period;

        if (_category[period] === void 0) {
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