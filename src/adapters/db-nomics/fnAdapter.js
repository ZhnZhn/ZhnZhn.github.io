import AdapterFn from '../AdapterFn'
import fnSelector from './fnSelector'

const {
  crError,
  crItemLink,
  crItemConf,
  joinBy,
  ymdToUTC,
  valueMoving,
  getValue
} = AdapterFn;
const {
  getPeriodAndValue,
  getTitle,
  getSubtitle,
  getIndexedAt
 } = fnSelector;

const C = {
  CHART_URL: 'https://db.nomics.world',
  SUBT_MAX: 60
};


const _isId = id => id && id.indexOf('/') !== -1;
const _crId = ({ dfProvider, dfCode, seriaId }) =>
  joinBy('/', dfProvider, dfCode, seriaId);
const _getId = (option) => _isId(option.seriaId)
  ? option.seriaId
  : _crId(option);

const _crItemLink = crItemLink
  .bind(null, 'DB Nomics Chart');
const _crUpdatedDate = json => {
  const _date = getIndexedAt(json).split('T')[0]
  return _date
    ? `<p>Updated by DB Nomics on ${_date}</p>`
    : '';
};
const _crDescr = (json, option) => {
  const _id = _getId(option);
  return`<p>SeriaId: ${_id}</p>
   ${_crUpdatedDate(json)}
   ${_crItemLink(C.CHART_URL+'/'+_id)}`;
};

const _crZhConfig = (option) => {
  const {
    dataSource, _itemKey,
    dfProvider, dfCode, seriaId,
    title
  } = option
  , _id = _itemKey || seriaId;
  return {
    id: _id, key: _id,
    itemCaption: title,
    dataSource,
    itemConf: {
       _itemKey: _id,
       ...crItemConf(option),
       dataSource,
       dfProvider, dfCode, seriaId
    }
  }
};
const _crInfo = (json, option) => ({
  name: getSubtitle(json),
  description: _crDescr(json, option)
})

const _isNumber = n => typeof n === 'number'
 && !Number.isNaN(n);


const fnAdapter = {
  crError,
  getValue,
  crTitle: ({ title, subtitle }, json) => {
    const _ = getSubtitle(json)
    , _subtitle = _.length > C.SUBT_MAX
         ? joinBy(': ', title, subtitle)
         : _;
    return {
      title: getTitle(json),
      subtitle: _subtitle
    };
  },

  crData: (json, fromDate) => {
    const data = []
    , _xFrom = fromDate ? ymdToUTC(fromDate) : 0
    , { period, value } = getPeriodAndValue(json)
    , _len = period.length;    
    let i = 0, _x, _y;
    for (i; i<_len; i++){
      _x = ymdToUTC(period[i])
      _y = value[i]
      if (_x > _xFrom && _isNumber(_y)) {
        data.push([ _x, _y ])
      }
    }
    return data;
  },

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(json, option)
  })
};

export default fnAdapter
