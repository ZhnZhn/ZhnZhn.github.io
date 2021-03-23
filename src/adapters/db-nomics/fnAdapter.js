import AdapterFn from '../AdapterFn'
import fnSelector from './fnSelector'

const {
  crError,
  crItemLink,
  crItemConf,
  joinBy,
  ymdToUTC,
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

const _crId = ({ dfProvider, dfCode, seriaId }) =>
  joinBy('/', dfProvider, dfCode, seriaId);

const _crItemLink = crItemLink
  .bind(null, 'DB Nomics Chart');
const _crUpdatedDate = json => {
  const _date = getIndexedAt(json).split('T')[0];
  return _date
    ? `<p>Updated by DB Nomics on ${_date}</p>`
    : '';
};
const _crDescr = (json, option) => {
  const _id = _crId(option);
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
  , _id = _itemKey;
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
 && n-n === 0;

const _isQuarter = str => (""+str).indexOf("Q") !== -1;

const _isAnnualQuarter = period =>
  !_isQuarter(period[0]) && _isQuarter(period[1]);

const _crPoint = (date, y) => ([ymdToUTC(date), y]);

const _crAqPoint = (date, y) => _isQuarter(date)
  ? _crPoint(date, y)
  : [];

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

  crData: (json, option) => {
    const { fromDate } = option
    , data = []
    , _xFrom = fromDate ? ymdToUTC(fromDate) : 0
    , { period, value } = getPeriodAndValue(json)
    , crPoint = _isAnnualQuarter(period)
       ? _crAqPoint
       : _crPoint
    , _len = period.length;
    let _arrPoint;
    for (let i=0; i<_len; i++){
      _arrPoint = crPoint(period[i], value[i]);
      if (_arrPoint[0] > _xFrom && _isNumber(_arrPoint[1])) {
        data.push(_arrPoint)
      }
    }
    return data;
  },

  crConfOption: (option, json) => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(json, option)
  })
};

export default fnAdapter
