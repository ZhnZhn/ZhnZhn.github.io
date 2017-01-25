
import FactoryChart from './FactoryChart';
import JsonStatFn from './JsonStatFn';
import EuroStatFn from './EuroStatFn';

const toColumn = {
  createConfig : (json, option) => {
    const { zhMapSlice:configSlice, time='', subtitle='' } = option
    return JsonStatFn.trJsonToCategory(json, configSlice)
             .then(({ categories, data, min }) => {
                 const config = FactoryChart.createColumnConfig();
                 EuroStatFn.setDataAndInfo({ config, data, json, option });
                 EuroStatFn.setCategories({ config, categories, min, time, subtitle });
                 return config;
             });
  },

  createSeria : (json, option, chart) => {
    const categories = chart.options.xAxis[0].categories;
    const { zhMapSlice:configSlice } = option
        , { time } = configSlice
        , data = JsonStatFn.trJsonToSeria(json, configSlice, categories)

    return {
      zhSeriaId : 'optionKey',
      zhValueText : 'Value',
      minY : EuroStatFn.findMinY(data),
      name: time,
      data : data
    };
  }
}

export default toColumn
