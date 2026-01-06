import { getValue } from '../../../utils/itemFn';

import {
  DF_TAIL,
  isCategory,
  isMap,
  isNotGeoOrReporter,
  crUrl
} from './apiFn';

const _isNotEmptyStr = str => str &&
  typeof str === 'string';

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
  if (_isNotEmptyStr(dfTail)) {
    _addDfTailTo(mapSlice, dfTail)
  }
  return mapSlice;
};

const _notEmptyOrGeo = (
  item
) => Boolean(item) && isNotGeoOrReporter(item.id);
const _crItems = ({
  seriaType,
  dfC,
  dfCmx,
  items,
  time
}) => {
  if (isCategory(seriaType)) {
    const _filterItemsBy = dfC
      ? item => Boolean(item) && item.id !== dfC
      : dfCmx
         ? item => item
         : _notEmptyOrGeo
    , _items = items.filter(_filterItemsBy);
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
