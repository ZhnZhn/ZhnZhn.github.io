import {  
  isNotEmptyArr,
  parseIntBy10
} from '../../utils/isTypeFn';
import {
  filterBoolean,
  joinByColon,
  joinByUndescore
} from '../../utils/arrFn';
import {
  getCaption,
  getValue
} from '../../utils/itemFn';
import {
  toUpperCaseFirst
} from '../../utils/strFn';

import {
  isInRange
} from '../../math/mathFn';

const _getCaption = item => toUpperCaseFirst(
  item && item.sc || getCaption(item)
);

const _crItemCaption = (
  items,
  titles
) => {
  if (!isNotEmptyArr(titles)) {
    titles = [0]
  }
  return joinByColon(...titles
    .map(titleIndex => _getCaption(items[titleIndex]))
  );
};

const _crCaptionItems = (
  items
) => (items || [])
  .map(item => _getCaption(item));

export const crItemKey = (
  items,
  ...args
) => {
  const _prefix = joinByUndescore(
    filterBoolean(items)
      .map(item => getValue(item) || getCaption(item) || item)
  );
  return joinByUndescore(_prefix, ...args);
}

//[itemCaption, title, subtitle, threeC]
export const crCaptions = (
  items,
  titles
) => {
  const itemCaption = _crItemCaption(items, titles)
  , _items = items.filter(getCaption)
  , [
    item1,
    item2,
    item3,
    item4,
    ...restItems
  ] = _items
  , oneC = _getCaption(item1)
  , twoC = _getCaption(item2)
  , threeC = _getCaption(item3)
  , fourC = _getCaption(item4);

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
  const _rt = parseIntBy10(rt);
  return isInRange(_rt, -1, 4)
    ? _rt
    : void 0;
}
