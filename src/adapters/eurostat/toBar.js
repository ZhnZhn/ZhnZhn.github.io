import FactoryChart from './FactoryChart';
import JsonStatFn from './JsonStatFn';
import EuroStatFn from './EuroStatFn';

const toBar = {
  createConfig : (json, option) => {
    const { zhMapSlice:configSlice, seriaColor } = option
    return JsonStatFn.trJsonToCategory(json, configSlice)
      .then(({ categories, data, min }) => {
          const config = FactoryChart.createBarConfig({ seriaColor })
          EuroStatFn.setDataAndInfo({ config, data, json, option })
          EuroStatFn.setCategories({ config, categories, min, option })
          EuroStatFn.colorSeries(config)
          return config;
     });
  }
};

export default toBar
