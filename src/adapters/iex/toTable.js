import AdapterFn from '../AdapterFn'

const { roundBy } = AdapterFn;

const HEADERS = [{
  name: 'Symbol',
  pn: 'symbol',
  style: { textAlign: 'center' }
},{
  name: 'Change %',
  pn: 'changePercent',
  isToN: true,
  isToFixed: true,
  isR: true
},{
  name: 'YTD %',
  pn: 'ytdChange',
  isToN: true,
  isToFixed: true,
  isR: true
},{
  name: 'Price',
  pn: 'latestPrice',
  isToN: true,
  isToFixed: true
}/*,{
  name: 'Company',
  pn: 'companyName',
}*/];

const _crTitle = (title, json) => {
  let _suffix = '';
  const _item = json[0];
  if (_item) {
    const _t = _item.latestTime || ''
    , _s = _item.latestSource || '';
    _suffix = (_t + ' ' + _s).trim()
  }
  return `${title} ${_suffix}`;
};

const _getCellValue = (r, h) => {
  const { pn, isToN, isToFixed } = h;
  return isToN
    ? isToFixed
        ? roundBy(r[pn], 2)
        : parseFloat(r[pn])
    : r[pn];
};

const _toRows = (headers, rows=[]) => {
  const _rows = rows.map(r => {
    headers.forEach(h => {
      r[h.pn] = _getCellValue(r, h);
    })
    return r;
  })
  return _rows;
};

const toTable = {
  crKey(option){
    option.key = option.value
    return option.value;
  },

  toConfig(json, option){
    const { title, key} = option;    
    return {
      id: key,
      title: _crTitle(title, json),
      headers: HEADERS,
      /*
      tableFn: {
        numberFormat,
        valueToHref
      },
      */
      rows: _toRows(HEADERS, json),
      zhCompType: 'TABLE',
      zhConfig: {
        id: key, key
      }
    };
  }
};

export default toTable
