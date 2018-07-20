
import AdapterFn from '../AdapterFn'

const { valueMoving, ymdToUTC, crZhFn } = AdapterFn;

const _crZhConfig = (option) => {
  const {
          title,
          dataSource, dfTitle='',
          value, linkFn
        } = option
  return {
    id: value, key: value,
    itemCaption: title,
    isWithoutAdd: true,
    isWithLegend: false,
    linkFn, item: value,
    dataSource: `${dataSource}: ${dfTitle}`
  };
};

const _crInfo = ({ title }) => ({
  name: title
});

const fnAdapter = {
  crData: (json) => {
    const data = json.Results.series[0].data
       , _data = [];
    data.forEach(p => {
      const { year, period='', value } = p
          , _m = parseInt((''+period).replace('M',''), 10)
      if (typeof _m === 'number' && _m>0 && _m<13) {
        _data.push({
           x: ymdToUTC(`${year}-${_m}`),
           y: parseFloat(value)
        });
      }
    })
    return _data.reverse();
  },

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option),
    ...crZhFn()
  })

};

export default fnAdapter
