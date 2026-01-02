import {
  isNumber,
  isStr,
  getObjectKeys
} from '../../utils/isTypeFn';
import {
  getByPropsFrom
} from '../../utils/objFn';

import { fCrValue } from '../AdapterFn';
import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';

import {
  getJsonData,
  getDataSeries,
  getRefAreaIndex,
  getDataDimensions
} from './fnAdapter';

const crData = (
  json,
  option
) => {
  const data = getJsonData(json)
  , series = getDataSeries(data)
  , dataDimensions = getDataDimensions(data)
  , _refAreaIndex = getRefAreaIndex(dataDimensions)
  , dimensionValues = getByPropsFrom(
     dataDimensions, "series", _refAreaIndex, "values"
  ) || []
  , _crValue = fCrValue(option)
  , _data = getObjectKeys(series)
   .reduce((data, itemKey) => {
      const _categoryIndex = parseFloat(itemKey.split(":")[_refAreaIndex])
      , categoryValue = getByPropsFrom(series[itemKey], "observations", "0", 0)
      , categoryName = isNumber(_categoryIndex)
          ? (dimensionValues[_categoryIndex] || {}).name
          : null;
      if (isNumber(categoryValue) && isStr(categoryName)) {
        data.push(crCategoryPoint(
          _crValue(categoryValue),
          categoryName
        ))
      }
      return data;
   }, []);
  return sortDescCategory(_data);
}
, toCategoryAdapter = crAdapterCategory(crData);

export default toCategoryAdapter
