import { isCategory } from '../CategoryFn';
import crAdapterType1 from '../crAdapterType1';
import crFromYearData from '../crFromYearData';
import crAdapterRouter from '../crAdapterRouter';
import toCategoryAdapter from './toCategoryAdapter';

const toLineAdapter = crAdapterType1({
  crData: crFromYearData
})
, getRoute = (
  option
) => isCategory(option.seriaType)
  ? toCategoryAdapter
  : toLineAdapter
, IrenaAdapter = crAdapterRouter(void 0, { getRoute })

export default IrenaAdapter
