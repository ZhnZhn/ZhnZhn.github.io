import {
  isArr,
  isNumber,
  isInArrStr,
  fCrValue
} from '../AdapterFn';

import { sortDescByPnY } from '../compareByFn';
import { crCategoryPoint } from '../CategoryFn';
import crAdapterCategory from '../crAdapterCategory';

const REG_DIGIT = /\d/;
const CATEGORY_IDS = [
  "ZH",
  "ZI",

  "XC",
  "EU",

  "XD",
  "XE",
  "ZB",
  "XF",
  "ZT",
  "XG",
  "XH",
  "XI",
  "XY",

  "XJ",
  "ZJ",

  "XL",
  "XM",
  "XN",
  "XO",

  "ZQ",
  "XP",
  "XQ",
  "XU",

  "OE",

  "ZF",
  "ZG",

  "XT"
];

const _isCategoryId = isInArrStr(CATEGORY_IDS);

const _crData = (
  json,
  option
) => {
  const _crValue = fCrValue(option)
  , _data = json[1];
  return isArr(_data) ? sortDescByPnY(_data
    .reduce((data, point) => {
      const { country, value } = point || {}
      , { id } = country || {};
      if (id
        && !REG_DIGIT.test(id)
        && !_isCategoryId(id)
        && isNumber(value)
      ) {
        data.push(crCategoryPoint(
          _crValue(point.value),
          country.value
        ))
      }
      return data;
    }, [])) : [];
}
, toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
