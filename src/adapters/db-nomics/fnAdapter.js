import AdapterFn from '../AdapterFn'
import fnSelector from './fnSelector'

const {
  crError,
  crItemLink,
  ymdToUTC,
  valueMoving
} = AdapterFn;
const {
  getPeriodAndValue,
  getTitle,
  getSubtitle,
  getInexedAt
 } = fnSelector;

const C = {
  CHART_URL: 'https://db.nomics.world',
  SUBT_MAX: 60
};

const _isId = id => id && id.indexOf('/') !== -1;
const _getId = ({ dfProvider, dfCode, seriaId }) => _isId(seriaId)
  ? seriaId
  : `${dfProvider}/${dfCode}/${seriaId}`;

const _crItemLink = crItemLink
  .bind(null, 'DB Nomics Chart');
const _crUpdatedDate = json => {
  const _date = getInexedAt(json).split('T')[0]
  return _date
    ? `<p>Updated by DBnomics on ${_date}</p>`
    : '';
};
const _crDescr = (json, option) => {
  const _id = _getId(option);
  return`<p>SeriaId: ${_id}</p>
   ${_crUpdatedDate(json)}
   ${_crItemLink(C.CHART_URL+'/'+_id)}`;
};

const _crZhConfig = ({ dataSource, _itemKey, seriaId }) => ({
  id: _itemKey || seriaId,
  key: _itemKey || seriaId,
  //itemCaption: title,
  isWithoutAdd: true,
  dataSource
});
const _crInfo = (json, option) => ({
  name: getSubtitle(json),
  description: _crDescr(json, option)
})

const _isNumber = n => typeof(n) === 'number'
 && !Number.isNaN(n);


const fnAdapter = {
  crError,
  crTitle: ({ title, subtitle }, json) => {
    const _ = getSubtitle(json)
    , _subtitle = _.length > C.SUBT_MAX
         ? `${title || ''}: ${subtitle || ''}`
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
