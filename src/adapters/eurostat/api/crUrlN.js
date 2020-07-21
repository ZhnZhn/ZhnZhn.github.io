import apiFn from './apiFn'

const {
  DF_TAIL,
  isCategory, isMap,
  crUrl,
  getValue
} = apiFn;

const _isNotEmptyStr = str => str &&
  typeof str === 'string';

const _addDfTailTo = (mapSlice, dfTail) => {
  dfTail.split('&').forEach(param => {
    const _arr = param.split('=');
    if (_arr[0] && _arr[1]) {
      mapSlice[_arr[0]] = _arr[1]
    }
  })
};

const _crMapSlice = (items, { dfTail }) => {
  const mapSlice = {};
  items.forEach(item => {
    mapSlice[item.id] = getValue(item)
  })
  if (_isNotEmptyStr(dfTail)) {
    _addDfTailTo(mapSlice, dfTail)
  }
  return mapSlice;
};

const _crItems = ({ seriaType, items, time }) => isCategory(seriaType)
  ? isMap(seriaType)
      ? items.filter(Boolean)
      : items.filter(Boolean).concat([{ id: 'time', value: time }])
  : items;

const _crQuery = (items, dfTail) => {
  const _q = items
    .map(item => `${item.id}=${getValue(item)}`)
    .join('&');
  return dfTail
    ? `${_q}&${dfTail}`
    : _q;
};

const _updateOptionsIf = (seriaType, items, options) => {
  if (isCategory(seriaType)) {
    options.zhMapSlice = _crMapSlice(items, options)
  }
};

const crUrlN = (options) => {
  const {
    seriaType,
    dfTable,
    dfTail
  } = options
  , _items = _crItems(options)
  , _q = _crQuery(_items, dfTail);

  _updateOptionsIf(seriaType, _items, options)

  return isCategory(seriaType)
    ? crUrl(dfTable, _q, `&${DF_TAIL}`)
    : crUrl(dfTable, _q);
};

export default crUrlN
