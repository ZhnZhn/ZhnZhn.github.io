import FactoryChart from './FactoryChart';
import JsonStatFn from './JsonStatFn';
import EuroStatFn from './EuroStatFn';

const toBar = {
  createConfig : (json, option) => {
    const { zhMapSlice:configSlice, seriaColor } = option
    return JsonStatFn.trJsonToCategory(json, configSlice)
      .then(({ categories, data, min }) => {
          const config = FactoryChart.createBarConfig({ seriaColor })
          EuroStatFn.addToCategoryConfig(config, {
            json, option, data, categories, min
          })          
          return config;
     });
  }
};

export default toBar
