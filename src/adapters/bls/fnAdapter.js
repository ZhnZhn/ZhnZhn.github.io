
import AdapterFn from '../AdapterFn'

const { valueMoving, ymdToUTC, crZhFn } = AdapterFn;

const _crZhConfig = (option) => {
  const { title, dataSource, value, linkFn } = option
  return {
    id: value, key: value,
    itemCaption: title,
    isWithoutAdd: true,
    isWithLegend: false,
    linkFn, item: value,
    dataSource
  };
};

const _crInfo = ({ title }) => ({
  name: title
});

const fnAdapter = {
  crData: (json) => {
    const data = json.Results.series[0].data;
    return data.map(p => {
      const { year, period='', value } = p
          , _d = `${year}-${(''+period).replace('M','')}`;
      return {
        x: ymdToUTC(_d),
        y: parseFloat(value)
      };
    }).reverse();
  },

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option),
    ...crZhFn()
  })

};

export default fnAdapter
