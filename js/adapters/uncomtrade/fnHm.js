"use strict";

exports.__esModule = true;
exports.toSeriaNames = exports.toHmCategories = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
var _conf = require("./conf");
var _fnAdapter = require("./fnAdapter");
const _crHm = () => Object.create(null);
const DF_PN_COUNTRY = 'partnerCode';
const DF_PN_VALUE = 'primaryValue';
const _toSortedArr = obj => (0, _isTypeFn.getObjectKeys)(obj).map(propName => obj[propName]).sort();
const _crPoint = (y, forSort) => ({
  y,
  forSort: forSort !== void 0 ? forSort : y
});
const _fCrValuePoint = pnValue => pnValue === DF_PN_VALUE ? item => _crPoint((0, _fnAdapter.getItemTradeValue)(item)) : item => _crPoint(item[pnValue]);
const _fCrPoint = (pn, item) => {
  const _w = item[pn],
    _y = _w !== 0 ? _w : item.TradeValue ? void 0 : 0;
  return _crPoint(_y);
};
const _crNetWeightPoint = _fCrPoint.bind(null, _conf.NET_WEIGHT);
const _crQuantityPoint = _fCrPoint.bind(null, _conf.QUANTITY);
const _fCrAvgPoint = (pn, item) => {
  const tradeValue = (0, _fnAdapter.getItemTradeValue)(item),
    _v = item[pn],
    _y = _v && tradeValue != null ? (0, _AdapterFn.roundBy)(tradeValue / _v, 2) : void 0;
  return _crPoint(_y, _v);
};
const _crAvgValuePerWeight = _fCrAvgPoint.bind(null, _conf.NET_WEIGHT);
const _crAvgValuePerQuantity = _fCrAvgPoint.bind(null, _conf.QUANTITY);
const _rCrPoint = {
  fDf: _fCrValuePoint,
  [_conf.NET_WEIGHT]: _crNetWeightPoint,
  [_conf.QUANTITY]: _crQuantityPoint,
  [_conf.AVG_PER_W]: _crAvgValuePerWeight,
  [_conf.AVG_PER_Q]: _crAvgValuePerQuantity
};
const _fPoint = pnValue => {
  const _crPoint = _rCrPoint[pnValue] || _rCrPoint.fDf(pnValue);
  return item => ({
    //isCategory: true,
    name: item.period,
    c: item.period,
    ..._crPoint(item)
  });
};
const _getRecentValueForSort = points => {
  const len = points && points.length;
  return len && len > 0 ? points[len - 1].forSort : void 0;
};
const toSeriaNames = (hm, compareBy) => (0, _fnAdapter.sortDescByPnValue)((0, _isTypeFn.getObjectKeys)(hm).map(propName => ({
  value: _getRecentValueForSort(hm[propName]),
  name: propName
})));
exports.toSeriaNames = toSeriaNames;
const toHmCategories = function (dataset, pnCountry, pnValue) {
  if (pnCountry === void 0) {
    pnCountry = DF_PN_COUNTRY;
  }
  if (pnValue === void 0) {
    pnValue = DF_PN_VALUE;
  }
  const _hm = _crHm(),
    _category = _crHm(),
    _crPoint = _fPoint(pnValue);
  let _point;
  dataset.forEach(item => {
    _point = _crPoint(item);
    if (_point.y != null) {
      const ptTitle = item[pnCountry];
      if (_hm[ptTitle] === void 0) {
        _hm[ptTitle] = [];
      }
      _hm[ptTitle].push(_point);
      const period = item.period;
      if (_category[period] === void 0) {
        _category[period] = period;
      }
    }
  });
  return [_hm, _toSortedArr(_category)];
};
exports.toHmCategories = toHmCategories;
//# sourceMappingURL=fnHm.js.map