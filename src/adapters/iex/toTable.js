import toTableFn from '../toTableFn'

const { crRows } = toTableFn;
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

const toTable = {
  crKey(option){
    option.key = option.value
    return option.key;
  },

  toConfig(json, option){
    const {title, key} = option;
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
      rows: crRows(HEADERS, json),
      zhCompType: 'TABLE',
      zhConfig: {
        id: key, key
      }
    };
  }
};

export default toTable
