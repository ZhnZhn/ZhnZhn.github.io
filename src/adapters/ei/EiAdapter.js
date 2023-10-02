import { isCategory } from '../CategoryFn';

import {
  isNumber,
  ymdToUTC
} from '../AdapterFn';

import crAdapterType1 from '../crAdapterType1';
import crFromYearData from '../crFromYearData';
import crAdapterRouter from '../crAdapterRouter';
import toCategoryAdapter from '../toCategoryAdapter';

const toLineAdapter = crAdapterType1({
  crData: (json, option) => {
    const _data = crFromYearData(json, option)
    , fromDate = option.fromDate
    , _fromDateUTC = ymdToUTC(fromDate)
    return isNumber(_fromDateUTC)
      ? _data.filter(p => p[0] > _fromDateUTC)
      : _data;
  }
})
, getRoute = (
  option
) => isCategory(option.seriaType)
  ? toCategoryAdapter
  : toLineAdapter
, IrenaAdapter = crAdapterRouter(void 0, { getRoute })

export default IrenaAdapter
