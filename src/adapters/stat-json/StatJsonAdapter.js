import arrangeSeriaByCategories from './arrangeSeriaByCategories';
import RouterConfig from './RouterConfig';


const _isArr = Array.isArray;

const _crConfig = (json, option) => {
  const { seriaType } = option
  , crConfig = RouterConfig.getCrConfig(seriaType);
  return crConfig(json, option);
};


//chart?.xAxis?.[0]?.categories
const _getCategories = chart =>
 ((chart.xAxis || [])[0] || {}).categories;
const _isCategoryCase = (config, categories) =>
  _isArr((config.xAxis||{}).categories)
  && _isArr(categories);

const StatJsonAdapter = {
  toConfig(json, option) {
     return {
       config: _crConfig(json, option)
     };
  },

  toSeries(json, option, chart) {
     const config = _crConfig(json, option)
     , seria = config.series[0]
     , categories = _getCategories(chart);

     return _isCategoryCase(config, categories)
       ? arrangeSeriaByCategories(seria, categories)
       : seria;
  }
};

export default StatJsonAdapter
