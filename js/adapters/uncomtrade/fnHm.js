'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _rFnCrPoint2;

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _crPoint(item.NetWeight || item.TradeQuantity);
};

var _crAvgPricePoint = function _crAvgPricePoint(item) {
  var TradeValue = item.TradeValue,
      NetWeight = item.NetWeight,
      TradeQuantity = item.TradeQuantity,
      _NetWeight = NetWeight || TradeQuantity,
      _y = _NetWeight && TradeValue != null ? parseFloat((TradeValue / _NetWeight).toFixed(2)) : undefined;

  return _crPoint(_y, _NetWeight);
};

var _rFnCrPoint = (_rFnCrPoint2 = {
  fDf: _fCrValuePoint
}, (0, _defineProperty3.default)(_rFnCrPoint2, _conf2.default.NET_WEIGHT, _crNetWeightPoint), (0, _defineProperty3.default)(_rFnCrPoint2, _conf2.default.AVG_PRICE, _crAvgPricePoint), _rFnCrPoint2);

var _fPoint = function _fPoint(pnValue) {
  var _crValue = _rFnCrPoint[pnValue] ? _rFnCrPoint[pnValue] : _rFnCrPoint.fDf(pnValue);
  return function (item) {
    return (0, _extends3.default)({
      isCategory: true,
      x: item.period
    }, _crValue(item));
  };
};

var _getRecentValueForSort = function _getRecentValueForSort(points) {
  var len = points && points.length;
  return len > 1 ? points[len - 1].forSort || points[len - 2].forSort : len === 1 ? points[len - 1].forSort : undefined;
};

var fnHm = {

  toSeriaNames: function toSeriaNames(hm, fnCompareBy) {
    var arr = [];
    for (var propName in hm) {
      if (propName !== _conf2.default.WORLD) {
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
        pnCountry = _ref$pnCountry === undefined ? 'ptTitle' : _ref$pnCountry,
        _ref$pnValue = _ref.pnValue,
        pnValue = _ref$pnValue === undefined ? 'TradeValue' : _ref$pnValue;

    var _hm = Object.create(null),
        _category = Object.create(null),
        _crPoint = _fPoint(pnValue);

    dataset.forEach(function (item) {
      var ptTitle = item[pnCountry];
      if (_hm[ptTitle] === undefined) {
        _hm[ptTitle] = [];
      }
      _hm[ptTitle].push(_crPoint(item));

      var period = item.period;
      if (_category[period] === undefined) {
        _category[period] = period;
      }
    });
    return {
      categories: _toSortedArr(_category),
      hm: _hm
    };
  }
};

exports.default = fnHm;
//# sourceMappingURL=fnHm.js.map