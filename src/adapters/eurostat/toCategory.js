
import FactoryChart from './FactoryChart';
import JsonStatFn from './JsonStatFn';
import EuroStatFn from './EuroStatFn';

const SCATTER_SERIA_PROPS = {
  type: 'scatter',
  marker: {
    radius: 5,
    symbol: 'circle'
  }
};

const toCategory = {
  createConfig: (json, option) => {
    const { zhMapSlice:configSlice } = option;
    return JsonStatFn.trJsonToCategory(json, configSlice)
       .then(({ categories, data, min }) => {
          const config = FactoryChart.createConfig(option)
          EuroStatFn.addToCategoryConfig(config, {
            json, option, data, categories, min
          })
          return config;
       });
  },

  createSeria: (json, option, chart) => {
    const categories = chart.options.xAxis[0].categories;
    const {
            zhMapSlice:configSlice={},
            time,
            seriaColor,
            seriaType
          } = option
        , _name = configSlice.time || time
        , data = JsonStatFn.trJsonToSeria(json, configSlice, categories)
        , _seriaProps = seriaType === 'DOT_SET'
            ? SCATTER_SERIA_PROPS
            : undefined;
    return {
      zhSeriaId: 'optionKey',
      zhValueText: 'Value',
      minY: EuroStatFn.findMinY(data),
      name: _name,
      color: seriaColor,
      data: data,
      ..._seriaProps
    };
  }
}

export default toCategory
