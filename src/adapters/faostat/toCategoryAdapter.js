import {
  isNumber,
  fCrValue
} from '../AdapterFn';
import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescByPnY } from '../compareByFn';
import { crCategoryTitle } from './fnAdapter';

const _crData = (
  json,
  option
) => {
  const _crValue = fCrValue(option);
  return sortDescByPnY(json.data.reduce((_data, item) => {
    const { Value, Area } = item || {}
    , _value = _crValue(parseFloat(Value));
    if (isNumber(_value) && _value !== 0 && Area) {
      _data.push(crCategoryPoint(
        _value,
        Area
      ))
    }
    return _data;
 }, []));
}

const toCategoryAdapter = crAdapterCategory(
  _crData,
  crCategoryTitle
);

export default toCategoryAdapter
