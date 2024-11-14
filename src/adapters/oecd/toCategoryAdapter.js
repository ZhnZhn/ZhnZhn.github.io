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
  getRefAreaIndex,
  getDataDimensions
} from './fnAdapter';

const crData = (
  json,
  option
) => {
  const data = getJsonData(json)
  , series = getDataSeries(data)
  , _refAreaIndex = getRefAreaIndex(option)
  , dimension = getByPropsFrom(
     getDataDimensions(data), "series", _refAreaIndex, "values"
  ) || []
  , _crValue = fCrValue(option)
  , _categories = []
  , _data = getObjectKeys(series)
   .reduce((data, itemKey) => {
      const _categoryIndex = parseFloat(itemKey.split(":")[_refAreaIndex])
      , categoryValue = getByPropsFrom(series[itemKey], "observations", "0", 0)
      , categoryName = isNumber(_categoryIndex)
          ? (dimension[_categoryIndex] || {}).name
          : null;
      if (isNumber(categoryValue) && isStr(categoryName)) {
        data.push(crCategoryPoint(
          _crValue(categoryValue),
          categoryName
        ))
        _categories.push({
          name: categoryName,
          id: (dimension[_categoryIndex] || {}).id
        })
      }
      return data;
   }, []);
  return sortDescCategory(_data);
}
, toCategoryAdapter = crAdapterCategory(crData);

export default toCategoryAdapter
