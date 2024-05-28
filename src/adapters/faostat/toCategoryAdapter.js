import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { isNumber } from '../AdapterFn';
import { compareByPnY } from '../compareByFn';
import { crCategoryTitle } from './fnAdapter'

const _crData = (
  json,
  option
) => json.data.reduce((_data, item) => {
    const _value = parseFloat(item.Value);
    if (isNumber(_value) && _value !== 0 && item.Area) {
      _data.push(crCategoryPoint(
        _value,
        item.Area
      ))
    }
    return _data;
 }, [])
 .sort(compareByPnY)
 .reverse();

const toCategoryAdapter = crAdapterCategory(
  _crData,
  crCategoryTitle
);

export default toCategoryAdapter
