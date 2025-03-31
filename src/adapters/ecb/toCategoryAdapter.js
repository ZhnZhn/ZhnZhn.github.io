import {
  isStr,
  getObjectKeys
} from '../../utils/isTypeFn';

import crAdapterCategory from '../crAdapterCategory';
import { getByPropsFrom } from '../AdapterFn';
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
  const  _seriesValues = getByPropsFrom(getDimensions(json),
     "series",
     findCategoryIndex(option),
     "values"
   ) || []
  , _series = getSeries(json);
  return sortDescCategory(getObjectKeys(_series)
    .reduce((data, key, index) => {
       const _value = getByPropsFrom(_series[key],
         "observations", "0", 0
       )
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
