import { isStrNotBlank } from '../../../utils/isTypeFn';
import { getValue } from '../../../utils/itemFn';
import { isNotGeoOrReporter } from '../EuroStatFn';

import {
  DF_TAIL,
  isCategory,
  isMap,
  crUrl
} from './apiFn';

const _addDfTailTo = (
  mapSlice,
  dfTail
) => {
  dfTail.split('&').forEach(param => {
    const _arr = param.split('=');
    if (_arr[0] && _arr[1]) {
      mapSlice[_arr[0]] = _arr[1]
    }
  })
};

const _crMapSlice = (
  items,
  { dfTail }
) => {
  const mapSlice = {};
  items.forEach(item => {
    mapSlice[item.id] = getValue(item)
  })
  if (isStrNotBlank(dfTail)) {
    _addDfTailTo(mapSlice, dfTail)
  }
  return mapSlice;
};

const _crItemsFilter = (
  dfC,
  dfCmx
) => dfC
  ? item => Boolean(item) && item.id !== dfC
  : dfCmx
  ? item => item
  : item => Boolean(item) && isNotGeoOrReporter(item.id);
const _crItems = ({
  seriaType,
  dfC,
  dfCmx,
  items,
  time
}) => {
  if (isCategory(seriaType)) {
    const _items = items
      .filter(_crItemsFilter(dfC, dfCmx));
    return isMap(seriaType)
      ? _items
      : _items.concat([{ id: 'time', value: time }])
  }
  return items;
};

const _crQuery = (
  items,
  dfTail
) => {
  const _q = items
    .map(item => `${item.id}=${getValue(item)}`)
    .join('&');
  return dfTail
    ? `${_q}&${dfTail}`
    : _q;
};

const _updateOptionsIf = (
  seriaType,
  items,
  options
) => {
  if (isCategory(seriaType)) {
    options.zhMapSlice = _crMapSlice(items, options)
  }
};

const crUrlN = (options) => {
  const {
    seriaType,
    dfCmx,
    dfTable,
    dfId,
    dfTail
  } = options
  , _dfTable = dfTable || dfId
  , _items = _crItems(options)
  , _q = _crQuery(_items, dfTail);
  _updateOptionsIf(seriaType, _items, options)

  return crUrl(
    !!dfCmx,
    _dfTable,
    _q,
    isCategory(seriaType) ? DF_TAIL : void 0
  );
};

export default crUrlN
