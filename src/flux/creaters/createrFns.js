import {
  filterBoolean,
  joinByColon,
  joinByUndescore
} from '../../utils/arrFn';
import {
  getC,
  getV
} from '../../utils/getPropertyFn';
import {
  toUpperCaseFirst
} from '../../utils/toUpperCaseFirst';

const _getC = item => toUpperCaseFirst(
  item && item.sc || getC(item)
);

const _isArr = Array.isArray;

const _crItemCaption = (
  items,
  titles
) => {
  if (!_isArr(titles) || titles.length === 0) {
    titles = [0]
  }
  return joinByColon(...titles
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
  const _prefix = joinByUndescore(
    filterBoolean(items)
      .map(item => getV(item) || getC(item) || item)
  );
  return joinByUndescore(_prefix, ...args);
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
    _title = joinByColon(oneC, twoC)
    _subtitle = joinByColon(threeC, fourC, ..._crCaptionItems(restItems))
  } else if (threeC) {
    _subtitle = joinByColon(twoC, threeC)
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
