import { getObjectKeys } from '../../utils/isTypeFn';
import { bindTo } from '../../utils/bindTo';
import { crRouter } from '../../utils/crRouter';

import { roundBy } from '../../math/mathFn';

import {
  NET_WEIGHT,
  QUANTITY,
  AVG_PER_Q,
  AVG_PER_W
} from './conf';

import {
  getItemTradeValue,
  sortDescByPnValue
} from './fnAdapter';

const _crHm = () => Object.create(null);

const DF_PN_COUNTRY = 'partnerCode';
const DF_PN_VALUE = 'primaryValue';

const _toSortedArr = (
  obj
) => getObjectKeys(obj)
  .map(propName => obj[propName])
  .sort();

const _crPoint = (
  y,
  forSort
) => ({
  y,
  forSort: forSort !== void 0 ? forSort : y
});

const _fCrValuePoint = (
  pnValue
) => pnValue === DF_PN_VALUE
  ? item => _crPoint(getItemTradeValue(item))
  : item => _crPoint(item[pnValue]);

const _fCrPoint = (
  pn,
  item
) => {
  const _w = item[pn]
  , _y = _w !== 0
    ? _w
    : item.TradeValue ? void 0 : 0;
  return _crPoint(_y);
};

const _crNetWeightPoint = bindTo(_fCrPoint, NET_WEIGHT)
const _crQuantityPoint = bindTo(_fCrPoint, QUANTITY)

const _fCrAvgPoint = (
  pn,
  item
) => {
  const tradeValue = getItemTradeValue(item)
  , _v = item[pn]
  , _y = _v && tradeValue != null
       ? roundBy(tradeValue/_v, 2)
       : void 0;
  return _crPoint(_y, _v);
}

const _crAvgValuePerWeight = bindTo(_fCrAvgPoint, NET_WEIGHT)
const _crAvgValuePerQuantity = bindTo(_fCrAvgPoint, QUANTITY)

const _rCrPoint = crRouter({
  fDf: _fCrValuePoint,
  [NET_WEIGHT]: _crNetWeightPoint,
  [QUANTITY]: _crQuantityPoint,
  [AVG_PER_W]: _crAvgValuePerWeight,
  [AVG_PER_Q]: _crAvgValuePerQuantity
})

const _fPoint = pnValue => {
  const _crPoint = _rCrPoint[pnValue]
    || _rCrPoint.fDf(pnValue);
  return item => ({
     //isCategory: true,
     name: item.period,
     c: item.period,
     ..._crPoint(item)
  });
};

const _getRecentValueForSort = points => {
   const len = points && points.length;
   return len && len > 0
     ? points[len-1].forSort
     : void 0;
};

export const toSeriaNames = (
  hm,
  compareBy
) => sortDescByPnValue(
  getObjectKeys(hm)
    .map(propName => ({
      value: _getRecentValueForSort(hm[propName]),
      name: propName
    }))
 )

export const toHmCategories = (
  dataset,
  pnCountry=DF_PN_COUNTRY,
  pnValue=DF_PN_VALUE
) => {
  const _hm = _crHm()
  , _category = _crHm()
  , _crPoint = _fPoint(pnValue);

  let _point;
  dataset.forEach(item => {
    _point = _crPoint(item)
    if (_point.y != null) {
      const ptTitle = item[pnCountry];

      if (_hm[ptTitle] === void 0) {
        _hm[ptTitle] = []
      }
      _hm[ptTitle].push(_point)

      const period = item.period;
      if (_category[period] === void 0) {
        _category[period] = period
      }
    }
  })
  return [
    _hm,
    _toSortedArr(_category),
  ];
}
