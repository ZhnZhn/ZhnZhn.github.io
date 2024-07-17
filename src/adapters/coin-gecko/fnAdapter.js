export { getYmdhmUTC } from '../AdapterFn';

import {
  getValue,
  isInRange
} from '../AdapterFn';

const DF_PAGE = 1
, DF_PER_PAGE = 10
, DF_CURRENCY = 'USD';

export const crPageConfig = option => {
  const { items=[] } = option
  , _page = getValue(items[0])
  , page = isInRange(_page, 0, 11)
      ? _page : DF_PAGE
  , _perPage = getValue(items[1])
  , perPage = isInRange(_perPage, 9, 51)
      ? _perPage : DF_PER_PAGE;
  return [
    page,
    perPage,
    getValue(items[2]) || DF_CURRENCY
  ];
}
