import {
  isNumber,
  isStr,
  getByPropsFrom,
  getObjectKeys,
  fCrValue
} from '../AdapterFn'
import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import {
  getJsonData,
  getDataSeries,
  getDataDimensions
} from './fnAdapter';

const crData = (
  json,
  option
) => {
  const data = getJsonData(json)
  , series = getDataSeries(data)
  , dimension = getByPropsFrom(
     getDataDimensions(data), "series", 0, "values"
  ) || []
  , _crValue = fCrValue(option);
  return sortDescCategory(getObjectKeys(series)
   .reduce((data, itemKey) => {
      const _categoryIndex = parseFloat(itemKey.split(":")[0])
      , categoryValue = getByPropsFrom(series[itemKey], "observations", "0", 0)
      , categoryName = isNumber(_categoryIndex)
          ? (dimension[_categoryIndex] || {}).name
          : null;
      if (isNumber(categoryValue) && isStr(categoryName)) {
        data.push(crCategoryPoint(
          _crValue(categoryValue),
          categoryName
        ))
      }
      return data;
   }, []));
}
, toCategoryAdapter = crAdapterCategory(crData);

export default toCategoryAdapter
