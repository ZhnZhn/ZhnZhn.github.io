import {
  isCategoryCase,
  arrangeSeriaByCategories,
  getCategories,
} from './CategoryFn';

const fToCategorySeries = (
  crConfig
) => (json, option, chart) => {
   const config = crConfig(json, option).config
   , seria = config.series[0]
   , categories = getCategories(chart);

   return isCategoryCase(config, categories)
     ? arrangeSeriaByCategories(seria, categories)
     : seria;
}

export default fToCategorySeries
