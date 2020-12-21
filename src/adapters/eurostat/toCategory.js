
import FactoryChart from './FactoryChart';
import JsonStatFn from './JsonStatFn';
import EuroStatFn from './EuroStatFn';

const {
  addToCategoryConfig,
  findMinY,
  crCategoryTooltip
} = EuroStatFn

const _filterZeroIf = (data, is) => is
  ? data.map(value => value === 0 ? null : value)
  : data;

const _crScatterProps = (seriaColor)  => ({
  type: 'scatter',
  marker: {
    fillColor: seriaColor,
    radius: 5,
    symbol: 'circle'
  }
});

const toCategory = {
  createConfig: (json, option) => {
    const { zhMapSlice:configSlice } = option;
    return JsonStatFn.trJsonToCategory(json, configSlice)
       .then(({ categories, data, min }) => {
          const config = FactoryChart.createConfig(option)
          addToCategoryConfig(config, {
            json, option, data, categories, min
          })
          return config;
       });
  },

  createSeria: (json, option, chart) => {
    const categories = chart.options.xAxis[0].categories;
    const {
        isFilterZero,
        zhMapSlice:configSlice={},
        time,
        seriaColor,
        seriaType
      } = option
    , data = JsonStatFn.trJsonToSeria(json, configSlice, categories)
    , _data = _filterZeroIf(data, isFilterZero)
    , _seriaProps = seriaType === 'DOT_SET'
        ? _crScatterProps(seriaColor)
        : void 0;
    return {      
      minY: findMinY(data),
      name: configSlice.time || time,
      color: seriaColor,
      data: _data,
      tooltip: crCategoryTooltip(),
      ..._seriaProps
    };
  }
}

export default toCategory
