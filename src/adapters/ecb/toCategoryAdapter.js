import crAdapterCategory from '../crAdapterCategory';
import { getObjectKeys, isStr } from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import {
  getDimensions,
  getSeries,
  findCategoryIndex
} from './fnAdapter';

const crDate = (
  json,
  option
) => {
  const _categoryIndex = findCategoryIndex(option)
   , _seriesValues = (((getDimensions(json)).series || [])[_categoryIndex] || {}).values || []
  , _series = getSeries(json);
  return sortDescCategory(getObjectKeys(_series)
    .reduce((data, key, index) => {
       const _value =  ((((_series[key] || {}).observations) || {})["0"] || [])[0]
       , _categoryName = (_seriesValues[index] || {}).name;
       if (_value !== null && isStr(_categoryName)) {
         data.push(crCategoryPoint(
           _value,
           _categoryName
         ))
       }
       return data;
    }, []))
}
, toCategoryAdapter = crAdapterCategory(crDate);

export default toCategoryAdapter
