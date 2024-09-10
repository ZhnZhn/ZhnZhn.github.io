import crAdapterCategory from '../crAdapterCategory';
import {
  getDimensions,
  getSeries
} from './fnAdapter';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';

const crDate = (
  json,
  option
) => {
  const _seriesCategories = ((((getDimensions(json)).series || [])[1] || {}).values || [])
     .map(item => (item || {}).name)
  , _series = getSeries(json);
  return sortDescCategory(Object.keys(_series)
    .map((key, index) => crCategoryPoint(
      ((((_series[key] || {}).observations) || {})["0"] || [])[0],
      _seriesCategories[index]
    )))
    .filter(point => point.y !== null);
}
, toCategoryAdapter = crAdapterCategory(crDate);

export default toCategoryAdapter
