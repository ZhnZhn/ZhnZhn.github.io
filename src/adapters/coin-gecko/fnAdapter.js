export { getYmdhmUTC } from '../AdapterFn';
export { crItemLink } from '../crFn';

import { getValue } from '../AdapterFn';

const DF_PAGE = 1
, DF_PER_PAGE = 10
, DF_CURRENCY = 'USD';

const _isInRange = (v, min, max) => v>min && v<max ;

export const crPageConfig = option => {
  const { items=[] } = option
  , _page = getValue(items[0])
  , page = _isInRange(_page, 0, 11)
      ? _page : DF_PAGE
  , _perPage = getValue(items[1])
  , perPage = _isInRange(_perPage, 9, 51)
      ? _perPage : DF_PER_PAGE;
  return [
    page,
    perPage,
    getValue(items[2]) || DF_CURRENCY
  ];
}
