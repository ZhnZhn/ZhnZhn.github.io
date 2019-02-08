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
  CHART_URL: 'https://db.nomics.world'
};

const _isNotId = id => id.indexOf('/') === -1;
const _getId = ({ dfProvider, dfCode, seriaId }) => _isNotId(seriaId)
  ? `${dfProvider}/${dfCode}/${seriaId}`
  : seriaId;

const _crDescr = (option) => {
  const _id = _getId(option);
  return`
   <p>SeriaId: ${_id}</p>
   <p><a href="${C.CHART_URL}/${_id}" style="padding-top: 4px;">DB Nomics Chart</a></p>
  `;
};

const _crZhConfig = ({ dataSource, seriaId }) => ({
  id: seriaId,
  key: seriaId,
  //itemCaption: title,
  isWithoutAdd: true,
  dataSource
});
const _crInfo = (json, option) => ({
  name: getSubtitle(json),
  description: _crDescr(option)
})

const _isNumber = n => typeof n === 'number'
 && !Number.isNaN(n);


const fnAdapter = {

  crTitle: (option, json) => ({
    title: getTitle(json),
    subtitle: getSubtitle(json)
  }),

  crData: (json) => {
    const data = []
    , { period, value } = getPeriodAndValue(json);
    period.forEach((p, i) => {
      if (_isNumber(value[i])) {
        data.push({
          x: ymdToUTC(p),
          y: value[i]
        })
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
