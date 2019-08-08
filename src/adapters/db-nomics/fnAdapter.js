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

  crData: (json) => {
    const data = []
    , { period, value } = getPeriodAndValue(json);
    period.forEach((p, i) => {
      if (_isNumber(value[i])) {
        data.push([ ymdToUTC(p), value[i] ])
      }
    })
    return data;
  },

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(json, option)
  })
};

export default fnAdapter
