
import AdapterFn from '../AdapterFn'

const { valueMoving, crZhFn } = AdapterFn;

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
    return json.Data.map(p => {
      return {
        x: p.time*1000,
        y: p.close
      };
    })
  },

  crConfigOption: ({ option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option),
    ...crZhFn()
  })
};

export default fnAdapter
