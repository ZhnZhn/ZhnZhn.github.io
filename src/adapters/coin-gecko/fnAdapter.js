export { getYmdhmUTC } from '../AdapterFn';

import { isInRange } from '../../math/mathFn';
import { getValues } from '../AdapterFn';

const DF_PAGE = 1
, DF_PER_PAGE = 10
, DF_CURRENCY = 'USD';

export const crPageConfig = option => {
  const [
    _page,
    _perPage,
    _currency
  ] = getValues(option)
  , page = isInRange(_page, 0, 11)
      ? _page : DF_PAGE
  , perPage = isInRange(_perPage, 9, 51)
      ? _perPage : DF_PER_PAGE;
  return [
    page,
    perPage,
    _currency || DF_CURRENCY
  ];
}
