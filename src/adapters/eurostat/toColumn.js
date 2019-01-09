
import FactoryChart from './FactoryChart';
import JsonStatFn from './JsonStatFn';
import EuroStatFn from './EuroStatFn';

const toColumn = {
  createConfig : (json, option) => {
    const { zhMapSlice:configSlice, seriaColor } = option;
    return JsonStatFn.trJsonToCategory(json, configSlice)
       .then(({ categories, data, min }) => {
          const config = FactoryChart.createColumnConfig({ seriaColor })
          EuroStatFn.addToCategoryConfig(config, {
            json, option, data, categories, min
          })
          return config;
       });
  },

  createSeria : (json, option, chart) => {
    const categories = chart.options.xAxis[0].categories;
    const {
            zhMapSlice:configSlice={},
            time,
            seriaColor
          } = option
        , _name = configSlice.time || time
        , data = JsonStatFn.trJsonToSeria(json, configSlice, categories);
    return {
      zhSeriaId : 'optionKey',
      zhValueText : 'Value',
      minY : EuroStatFn.findMinY(data),
      name: _name,
      color: seriaColor,
      data : data
    };
  }
}

export default toColumn
