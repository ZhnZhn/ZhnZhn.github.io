import { isCategory } from '../CategoryFn';
import crAdapterType1 from '../crAdapterType1';
import crFromYearData from '../crFromYearData';
import toCategoryAdapter from './toCategoryAdapter';

const toLineAdapter = crAdapterType1({
  crData: crFromYearData
});

const _getAdapter = (option) => {
  const { seriaType } = option;
  return isCategory(seriaType)
    ? toCategoryAdapter
    : toLineAdapter;
}

const IrenaAdapter = {
  toConfig: (json, option) => {
    const _adapter = _getAdapter(option);
    return _adapter.toConfig(json, option);
  },

  toSeries: (json, option, chart) => {
    const _adapter = _getAdapter(option);
    return _adapter.toSeries(json, option, chart);
  }
}


export default IrenaAdapter
