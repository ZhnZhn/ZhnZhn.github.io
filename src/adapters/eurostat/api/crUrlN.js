import apiFn from './apiFn'

const { isCategory, crUrl } = apiFn;

const _crMapSlice = (items) => {
  const mapSlice = {};
  items.forEach(item => {
    mapSlice[item.id] = item.value
  })
  return mapSlice;
};

const _crItems = ({ seriaType, items, time }) => isCategory(seriaType)
  ? [ {id: time, value: time}, ...items.slice(1)]
  : items;

const _crQuery = (items) => items
  .map(item => `${item.id}=${item.value}`)
  .join('&');

const _updateOptionsIf = (seriaType, items, options) => {
  if (isCategory(seriaType)) {
    options.zhMapSlice = _crMapSlice(items)
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

  return crUrl(dfTable, _q);
};

export default crUrlN
