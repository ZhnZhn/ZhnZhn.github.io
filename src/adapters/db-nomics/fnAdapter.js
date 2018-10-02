import AdapterFn from '../AdapterFn'

const {
  ymdToUTC,
  findMaxY,
  findMinY,
  crZhFn,
  valueMoving
} = AdapterFn;

const C = {
  CHART_URL: 'https://db.nomics.world'
};

const _crDescr = ({ dfProvider, dfCode, seriaId }) => `
  <p>SeriaId: ${dfProvider}/${dfCode}/${seriaId}</p>
  <p><a href="${C.CHART_URL}/${dfProvider}/${dfCode}/${seriaId}" style="padding-top: 4px;">DB Nomics Chart</a></p>
  `;

const _crZhConfig = (json, option) => {
  const { dataSource, seriaId } = option
  , id = seriaId;
  return {
    id, key: id,
    //itemCaption: title,
    isWithoutAdd: true,
    dataSource
  };
};
const _crInfo = (json, option) => {
  const name = json.series.name || ''
  return {
    name: name,
    description: _crDescr(option)
  };
};

const fnAdapter = {
  findMaxY: findMaxY,
  findMinY: findMinY,

  crTitle(option, json){
    const title = json.series.name || ''
    , subtitle = '';
    return {
      title,
      subtitle
    };
  },

  crData(json){
    const { series } = json
    , { period, value } = series
    , data = [];
    period.forEach((p, i) => {
      data.push({
        x: ymdToUTC(p),
        y: value[i]
      })
    })
    return data;
  },

  crConfigOption({ json, option, data }){
    return {
      zhConfig: _crZhConfig(json, option),
      valueMoving: valueMoving(data),
      info: _crInfo(json, option),
      ...crZhFn()
    };
  }
};

export default fnAdapter
