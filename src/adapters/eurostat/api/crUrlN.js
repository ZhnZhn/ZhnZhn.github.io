import apiFn from './apiFn'

const {
  DF_TAIL,
  isCategory, crUrl
} = apiFn;

const _isStrNotEmpty = str => typeof str === 'string' && str;

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
    mapSlice[item.id] = item.value
  })
  if (_isStrNotEmpty(dfTail)) {
    _addDfTailTo(mapSlice, dfTail)
  }  
  return mapSlice;
};

const _crItems = ({ seriaType, items, time }) => isCategory(seriaType)
  ? [ ...items.filter(Boolean), {id: 'time', value: time} ]
  : items;

const _crQuery = (items) => items
  .map(item => `${item.id}=${item.value}`)
  .join('&');

const _updateOptionsIf = (seriaType, items, options) => {
  if (isCategory(seriaType)) {
    options.zhMapSlice = _crMapSlice(items, options)
  }
};

const crUrlN = (options) => {
  const {
    seriaType,
    dfTable
  } = options
  , _items = _crItems(options)
  , _q = _crQuery(_items);

  _updateOptionsIf(seriaType, _items, options)

  return isCategory(seriaType)
    ? crUrl(dfTable, _q, `&${DF_TAIL}`)
    : crUrl(dfTable, _q);
};

export default crUrlN
