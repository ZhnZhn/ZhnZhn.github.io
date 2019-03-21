import AdapterFn from '../AdapterFn'
import fnSelector from './fnSelector'

const {
  ymdToUTC,
  valueMoving
} = AdapterFn;
const {
  getPeriodAndValue,
  getTitle,
  getSubtitle
 } = fnSelector;

const C = {
  CHART_URL: 'https://db.nomics.world',
  SUBT_MAX: 60
};

const _isId = id => id && id.indexOf('/') !== -1;
const _getId = ({ dfProvider, dfCode, seriaId }) => _isId(seriaId)
  ? seriaId
  : `${dfProvider}/${dfCode}/${seriaId}`;

const _crDescr = (option) => {
  const _id = _getId(option);
  return`
   <p>SeriaId: ${_id}</p>
   <p><a href="${C.CHART_URL}/${_id}" style="padding-top: 4px;">DB Nomics Chart</a></p>
  `;
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
  description: _crDescr(option)
})

const _isNumber = n => typeof(n) === 'number'
 && !Number.isNaN(n);


const fnAdapter = {

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
