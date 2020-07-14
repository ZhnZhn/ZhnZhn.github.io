import toTableFn from '../toTableFn'

const { crRows } = toTableFn;
const ID_PROP_NAME = 'symbol'
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
},{
  isHide: true,
  name: 'peRatio',
  pn: 'peRatio',
  isToN: true,
  isToFixed: true,
  isR: true
},{
  isHide: true,
  name: 'Company',
  pn: 'companyName',
},{
  isHide: true,
  name: 'Exchange',
  pn: 'primaryExchange',
}];

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
      config: {
        id: key,
        title: _crTitle(title, json),
        headers: HEADERS,
        rows: crRows(HEADERS, json, ID_PROP_NAME),
        dataSource: 'IEX Cloud',
        zhCompType: 'TABLE',
        zhConfig: {
          id: key, key
        }
      }
    };
  }
};

export default toTable
