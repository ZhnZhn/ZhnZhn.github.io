import { joinBy } from '../../utils/arrFn';
import {
  getC as _gC,
  getV as _gV
} from '../../utils/getPropertyFn';
import { toUpperCaseFirst } from '../../utils/toUpperCaseFirst';

export const getC = _gC
export const getV = _gV
export const isFn = fn => typeof fn === 'function'

const _getC = item => toUpperCaseFirst(
  item && item.sc || getC(item)
);

const _isArr = Array.isArray;
const _joinByColon = (arrStr) => joinBy(": ", ...arrStr);

const _crItemCaption = (
  items,
  titles
) => {
  if (!_isArr(titles) || titles.length === 0) {
    titles = [0]
  }
  return _joinByColon(titles
    .map(titleIndex => _getC(items[titleIndex]))
  );
};

const _crCaptionItems = (
  items
) => (items || [])
  .map(item => _getC(item));

export const crItemKey = (
  items,
  ...args
) => {
  const _prefix = items
    .filter(Boolean)
    .map(item => getV(item) || getC(item) || item)
    .join('_');
  return joinBy("_", _prefix, ...args);
}

//[itemCaption, title, subtitle, threeC]
export const crCaptions = (
  items,
  titles
) => {
  const itemCaption = _crItemCaption(items, titles)
  , _items = items.filter(getC)
  , [
    item1,
    item2,
    item3,
    item4,
    ...restItems
  ] = _items
  , oneC = _getC(item1)
  , twoC = _getC(item2)
  , threeC = _getC(item3)
  , fourC = _getC(item4);

  let _title = oneC, _subtitle;
  if (fourC) {
    _title = _joinByColon([oneC, twoC])
    _subtitle = _joinByColon([threeC, fourC, ..._crCaptionItems(restItems)])
  } else if (threeC) {
    _subtitle = _joinByColon([twoC, threeC])
  } else if (twoC) {
    _subtitle = twoC
  }

  return [
    itemCaption,
    _title || _subtitle,
    _title ? _subtitle : void 0,
    threeC || twoC,
  ];
}

export const crRoundTo = (
  rt
) => {
  const _rt = parseInt(rt, 10);
  return _rt>-1 && _rt<4
    ? _rt
    : void 0;
}
